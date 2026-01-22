import requests, json, time, os
from slugify import slugify
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# --- Set up ---
NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
DATABASE_ID  = os.environ.get("DATABASE_ID")
IMAGE_FOLDER = "public/member_images"
HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Content-Type": "application/json",
    "Notion-Version": "2022-06-28",
}
# Check required 
if not NOTION_TOKEN or not DATABASE_ID:
    print("❌ Missing NOTION_TOKEN or DATABASE_ID in environment variables!")
    exit(1)

# Set up session with retry strategy
session = requests.Session()
retry_strategy = Retry(
    total=3, # Max retries: 3
    backoff_factor=1, # Wait 1s, 2s, 4s between retries
    status_forcelist=[429, 500, 502, 503, 504], # Retry on these status codes
)
session.mount("https://", HTTPAdapter(max_retries=retry_strategy))

def download_image(url, name, force=False):
    default_path = '/default.png'
    if not url: return default_path
    os.makedirs(IMAGE_FOLDER, exist_ok=True)
    
    filename = f"{slugify(name, separator='_')}.jpg"
    save_path = os.path.join(IMAGE_FOLDER, filename)
    temp_path = save_path + ".tmp" # Use temporary file during download
    web_path  = f"/member_images/{filename}"

    if not force and os.path.exists(save_path) and os.path.getsize(save_path) > 1024:
        return web_path

    try:
        # Use session with pre-configured retry strategy
        with session.get(url, stream=True, timeout=20) as res:
            res.raise_for_status()
            # Download chunks and write to temporary file            
            with open(temp_path, 'wb') as f:
                for chunk in res.iter_content(chunk_size=8192):
                    if chunk: f.write(chunk)
            
            # Validate if the downloaded file is too small (likely corrupted)
            if os.path.getsize(temp_path) < 100:
                raise Exception("File too small, download might have failed")
                
           # Replace existing file only after successful download
            if os.path.exists(save_path): os.remove(save_path)
            os.rename(temp_path, save_path)
            
            print(f"✅ Downloaded: {filename}")
            return web_path
    except Exception as e:
        if os.path.exists(temp_path): os.remove(temp_path)
        print(f"❌ Error downloading image for {name}: {e}")
    return web_path if os.path.exists(save_path) else None

def get_body_image(page_id):
    try:
        res = session.get(f"https://api.notion.com/v1/blocks/{page_id}/children", headers=HEADERS)
        for b in res.json().get("results", []):
            if b["type"] == "image":
                img = b["image"]
                return img["file"]["url"] if img["type"] == "file" else img["external"]["url"]
    except: pass
    return None

def process_notion_data():
    res = session.post(f"https://api.notion.com/v1/databases/{DATABASE_ID}/query", headers=HEADERS)
    if res.status_code != 200: return print(f"❌ Error: {res.text}")
    
    pages = res.json().get("results", [])
    cache_file = "notion_cache.json"
    final_data = []
    cache = {}
    if os.path.exists(cache_file):
        try:
            with open(cache_file, "r", encoding="utf-8") as f:
                cache = json.load(f)
        except:
            cache = {}
    new_cache = {}

    for page in pages:
        p_id, last_edit = page["id"], page["last_edited_time"]
        props = page["properties"]
        
        name_obj = props.get("Your Name", {}).get("title", [])
        name = name_obj[0]["plain_text"] if name_obj else "unnamed"
        
        filename = f"{slugify(name, separator='_')}.jpg"
        local_path = os.path.join(IMAGE_FOLDER, filename)
        
        # Determine if data has changed or file is missing
        is_changed = cache.get(p_id) != last_edit
        is_missing = not os.path.exists(local_path) or os.path.getsize(local_path) < 1024

        if is_changed or is_missing:
            img_url = get_body_image(p_id)
            img_path = download_image(img_url, name, force=is_changed)
            # Update cache only if download was successful
            new_cache[p_id] = last_edit if img_path else cache.get(p_id)
            time.sleep(0.2) # Slight delay to avoid Notion rate limiting
        else:
            img_path, new_cache[p_id] = f"/member_images/{filename}", last_edit

        final_data.append({
            "name": name,
            "role": props.get("Role", {}).get("select", {}).get("name", "N/A"),
            "image": img_path
        })

    os.makedirs("src/data", exist_ok=True)
    with open(cache_file, "w") as f: json.dump(new_cache, f)
    with open("src/data/notion_member.json", "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=4)
    print("🚀 completed successfully!")

if __name__ == "__main__":
    process_notion_data()