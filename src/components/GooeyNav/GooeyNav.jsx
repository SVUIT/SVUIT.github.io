import { useRef, useEffect, useState } from 'react';
import './GooeyNav.css';

const GooeyNav = ({
  items,
  initialActiveIndex = -1
}) => {
  const containerRef = useRef(null);
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [hoverIndex, setHoverIndex] = useState(null);

  const updateEffectPosition = (element, index) => {
    if (!containerRef.current || !navRef.current) return;
    
    // Update active index for visual feedback
    if (index !== undefined) {
      setActiveIndex(index);
    }
    
    // Add ripple effect on hover
    if (element) {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      element.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
  };

  const handleHover = (e, index) => {
    e.stopPropagation(); // Prevent event bubbling
    const liEl = e.currentTarget;
    setHoverIndex(index);
    // Only update effect position if not already active
    if (activeIndex !== index) {
      updateEffectPosition(liEl, index);
    }
  };
  
  const handleHoverEnd = (e) => {
    e.stopPropagation();
    setHoverIndex(null);
  };

  const handleClick = (e) => {
    const href = e.currentTarget.getAttribute('data-href');
    if (href) window.location.href = href;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('data-href');
      if (href) window.location.href = href;
    }
  };

  // Remove the handleAnimationEnd function as it's no longer needed for hover behavior

  // Add ripple effect styles dynamically
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
      
      .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        width: 20px;
        height: 20px;
        margin-top: -10px;
        margin-left: -10px;
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="gooey-nav-container" ref={containerRef}>
      <nav>
        <ul ref={navRef} className="gooey-nav">
          {items.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${hoverIndex === index ? 'active' : ''}`}
              onMouseEnter={(e) => handleHover(e, index)}
              onMouseLeave={handleHoverEnd}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              tabIndex="0"
              data-href={item.href}
              style={{ 
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                willChange: 'transform, background-color',
                zIndex: 1
              }}
            >
              <span className="nav-text">
                {item.label}
                <span className="nav-underline"></span>
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
