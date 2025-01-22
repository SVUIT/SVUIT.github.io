gsap.registerPlugin(ScrollTrigger);

const features = document.querySelectorAll('.feature');
features.forEach((feature) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: feature,
            start: "top 80%",
            end: "top 50%",   
            scrub: true,
        }
    })
    .fromTo(feature, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.5 } 
    );
});

const elementsToAnimate = [
    { selector: '.meetourteam', y: 30 },
    { selector: '.btn', y: 50 },
    { selector: '.about_text', y: 40 },
    { selector: '.image_container', y: 30 },
    { selector: '.jumbotron_heading', y: 60 },

];

elementsToAnimate.forEach(({ selector, y }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top 90%",
                end: "top 60%",
                scrub: true,
            }
        })
        .fromTo(element, 
            { y, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.5 }
        );
    });
});

const meetOurTeamSection = document.querySelector(".meetourteam_section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        meetOurTeamSection.classList.add("active");
      } else {
        meetOurTeamSection.classList.remove("active");
      }
    });
  },
  { threshold: 0.1 } 
);

observer.observe(meetOurTeamSection);
