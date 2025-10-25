import React, { useRef, useEffect, useState, lazy } from 'react';
import './App.css';
import { performanceConfig } from './config/performance';

// Lazy load heavy components
const GooeyNav = lazy(() => import('./components/GooeyNav/GooeyNav'));
const InfoCards = lazy(() => import('./components/InfoCards/InfoCards'));
const FadeInOnScroll = lazy(() => import('./components/FadeInOnScroll/FadeInOnScroll'));

// Custom Cursor Component
const CustomCursor = () => {
  const cursorDot = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 100);
    };

    const handleLinkHover = () => {
      if (cursorDot.current) {
        cursorDot.current.classList.add('active');
      }
    };

    const handleLinkLeave = () => {
      if (cursorDot.current) {
        cursorDot.current.classList.remove('active');
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [tabindex]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      // Cleanup
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <div 
      ref={cursorDot}
      className={`cursor-dot ${isActive ? 'active' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};

const BackgroundDecorations = () => {
  const randomPositions = Array.from({ length: 20 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    opacity: Math.random() * 0.1 + 0.05,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    blur: Math.random() * 30 + 20
  }));

  return (
    <>
      {randomPositions.slice(0, 4).map((pos, i) => (
        <div key={`blob-${i}`} style={{
          position: 'fixed',
          top: `${pos.y}%`,
          left: `${pos.x}%`,
          width: `${pos.size * 2}px`,
          height: `${pos.size * 2}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, 
            rgba(${Math.floor(Math.random() * 100 + 155)}, 
            ${Math.floor(Math.random() * 100 + 155)}, 
            255, ${pos.opacity}) 0%, 
            rgba(0, 0, 0, 0) 70%)`,
          filter: `blur(${pos.blur}px)`,
          opacity: pos.opacity,
          animation: `float ${pos.duration}s ease-in-out ${pos.delay}s infinite ${i % 2 ? 'reverse' : 'alternate'}`,
          zIndex: -2,
          pointerEvents: 'none'
        }} />
      ))}
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), 
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(179, 136, 255, 0.1) 0%, transparent 70%)
        `,
        backgroundSize: '60px 60px, 60px 60px, 100% 100%',
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'perspective(500px) rotateX(20deg) translateZ(0)'
      }} />
      
      {[...Array(50)].map((_, i) => {
        const size = Math.random() * 6 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.3 + 0.1;
        
        return (
          <div key={`particle-${i}`} style={{
            position: 'fixed',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            background: `rgba(100, 243, 255, ${opacity})`,
            left: `${posX}%`,
            top: `${posY}%`,
            boxShadow: `0 0 ${size * 2}px ${size}px rgba(100, 243, 255, ${opacity * 0.5})`,
            animation: `float ${duration}s ease-in-out ${delay}s infinite ${i % 2 ? 'alternate' : 'alternate-reverse'}`,
            zIndex: -2,
            pointerEvents: 'none'
          }} />
        );
      })}
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.1) 1px, rgba(0, 0, 0, 0.1) 2px)',
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.3
      }} />
    </>
  );
};

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Resource hints for performance
  useEffect(() => {
    // Add preconnect for external domains
    performanceConfig.resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossOrigin) link.crossOrigin = hint.crossOrigin;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup on unmount
      performanceConfig.resourceHints.forEach(hint => {
        const links = document.querySelectorAll(`link[href="${hint.href}"]`);
        links.forEach(link => link.remove());
      });
    };
  }, []);
  
  const items = [
    { label: "Kho tài liệu", href: "https://svuit.org/mmtt" },
    { label: "Đóng góp", href: "https://svuit.org/mmtt/docs/contribute" },
    { label: "Thông báo", href: "https://svuit.org/mmtt/docs/ThongBao/index" }
  ];

  // Register service worker and set up performance monitoring
  useEffect(() => {
    // Register service worker if enabled
    if (performanceConfig.features.serviceWorker) {
      const { register } = require('./utils/serviceWorker');
      register({
        onSuccess: () => console.log('ServiceWorker registration successful'),
        onUpdate: (registration) => {
          console.log('New content is available; please refresh.');
          if (window.confirm('New version available! Update now?')) {
            const waitingServiceWorker = registration.waiting;
            if (waitingServiceWorker) {
              waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        }
      });
    }

    
    // Set initial visibility with a small delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      @keyframes float {
        0%, 100% { 
          transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% { 
          transform: translateY(-20px) translateX(10px) rotate(2deg);
        }
        50% { 
          transform: translateY(10px) translateX(-10px) rotate(-2deg);
        }
        75% { 
          transform: translateY(0) translateX(15px) rotate(1deg);
        }
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.5); opacity: 1; }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes fadeInRight {
        from {
          opacity: 0;
          transform: translateX(-10px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    
    const cursorStyles = document.createElement('style');
    cursorStyles.innerHTML = `
      /* Hide all default cursors */
      *, *::before, *::after, a, button, [role="button"], input, textarea, select, [tabindex] {
        cursor: none !important;
      }
      
      /* Custom dot cursor - consistent style */
      .cursor-dot {
        width: 10px;
        height: 10px;
        background-color: var(--primary);
        position: fixed;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: none;
        mix-blend-mode: difference;
        will-change: transform;
        left: 0;
        top: 0;
      }
    `;
    document.head.appendChild(cursorStyles);
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(cursorStyles);
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div className="app-cursor" style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(180deg, #0a0e17 0%, #0f1a26 100%)',
      zIndex: 1,
      paddingBottom: 0,
      margin: 0,
      cursor: 'none'
    }}>
      <CustomCursor />
      <BackgroundDecorations />
      <div style={{ 
        flex: '0 1 auto',
        padding: '0.5rem 2rem 0',
        position: 'relative',
        overflow: 'hidden',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        zIndex: 2, // Adjusted z-index
        marginBottom: '-1rem'
      }}>
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          left: '0.5rem',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <button 
            onClick={() => window.location.href = '/'}
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              background: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              width: '70px',
              height: '70px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              boxShadow: hoveredButton === 'home' ? '0 6px 20px rgba(0, 179, 255, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
              border: hoveredButton === 'home' ? '1px solid rgba(0, 179, 255, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
              transform: hoveredButton === 'home' ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)'
            }}
          >
            <img 
              src="/favicon.ico" 
              alt="Home" 
              style={{ 
                width: '50px', 
                height: '50px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 5px rgba(100, 243, 255, 0.5))',
                transition: 'all 0.3s ease',
                marginTop: '0.2rem'
              }} 
            />
          </button>
        </div>

        <div style={{ 
          width: 'auto',
          position: 'absolute',
          top: '-1rem',
          right: '1rem',
          zIndex: 10
        }}>
          <GooeyNav 
            initialActiveIndex={-1}
            items={items}
            particleCount={12}
            particleDistances={[90, 10]}
            particleR={100}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>
        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          padding: '6rem 0 0 0',
          position: 'relative',
          zIndex: 100
        }}>
          <FadeInOnScroll direction="up" delay={100}>
            <div style={{
              position: 'relative',
              textAlign: 'center',
              margin: '0 auto 2rem',
              padding: '2rem 3rem',
              borderRadius: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
              maxWidth: 'fit-content'
            }}>
              <h1 className="main-heading" style={{
                fontSize: '4rem',
                fontWeight: '700',
                margin: '0',
                backgroundImage: 'linear-gradient(90deg, #fff, #b388ff, #7c4dff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient 8s ease infinite'
              }}>
                <span style={{ display: 'block', fontSize: '2.8rem', marginBottom: '0.5rem', color: 'rgba(255, 255, 255, 0.9)' }}>Study Vault of</span>
                <span style={{ display: 'block', fontSize: '5.2rem', lineHeight: '1', marginTop: '0.5rem' }}>UIT</span>
              </h1>
            </div>
          </FadeInOnScroll>
          
          <FadeInOnScroll direction="up" delay={200}>
            <div style={{ 
              marginTop: '2rem',
              display: 'flex',
              gap: '1.5rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 10
            }}>
              <button
                onClick={() => window.location.href = 'https://svuit.org/mmtt/docs/contribute'}
                onMouseEnter={() => setHoveredButton('contribute')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  padding: '0.8rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#fff',
                  background: 'linear-gradient(45deg, #b388ff, #7c4dff)',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredButton === 'contribute' ? '0 7px 20px rgba(0, 255, 199, 0.4)' : '0 4px 15px rgba(0, 255, 199, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                  transform: hoveredButton === 'contribute' ? 'translateY(-3px)' : 'translateY(0)'
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>Đóng góp</span>
              </button>
              
              <button
                onClick={() => window.location.href = 'https://svuit.org/mmtt'}
                onMouseEnter={() => setHoveredButton('docs')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  padding: '0.8rem 2rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#fff',
                  background: hoveredButton === 'docs' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(5px)',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                  transform: hoveredButton === 'docs' ? 'translateY(-3px)' : 'translateY(0)'
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>Xem tài liệu</span>
              </button>
            </div>
          </FadeInOnScroll>
        </div>
        
        <FadeInOnScroll direction="up" delay={300}>
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 50
          }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              margin: '2rem 0 1.5rem',
              backgroundImage: 'linear-gradient(90deg, #b388ff, #7c4dff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              width: '100%',
              paddingBottom: '0.5rem'
            }}>
              Introduction
            </h2>
            <InfoCards />
          </div>
        </FadeInOnScroll>

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          margin: '5rem auto',
          padding: '0 2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              backgroundImage: 'linear-gradient(90deg, #7c4dff, #b388ff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              margin: '0 1rem 0 0',
              fontSize: '46px',
              fontFamily: 'Fjalla One, sans-serif',
              fontWeight: 'bold'
            }}>
              About
            </h2>
            <span style={{
              color: '#fff',
              fontFamily: 'Fjalla One, sans-serif',
              fontSize: '46px',
              fontWeight: 'bold',
              marginLeft: '1rem'
            }}>
              our team
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} style={{
                position: 'relative',
                marginBottom: '2rem',
                overflow: 'hidden',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(124, 77, 255, 0.2)'
              }}>
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '15px',
                  border: `3px solid ${item % 2 === 0 ? '#b388ff' : '#7c4dff'}`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/${item}${item % 2 === 0 ? '.jpg' : '.png'}`} 
                    alt={`Team member ${item}`}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      transition: 'transform 0.5s ease'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <FadeInOnScroll direction="up" delay={400}>
          <div style={{
            maxWidth: '1200px',
            width: '100%',
            margin: '5rem auto',
            padding: '0 2rem',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span style={{
                fontSize: '3rem',
                fontWeight: '700',
                backgroundImage: 'linear-gradient(90deg, #7c4dff, #b388ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginRight: '1rem'
              }}>
                Meet
              </span>
              <span style={{
                fontSize: '2.875rem',
                fontFamily: 'Fjalla One, sans-serif',
                color: '#fff',
                fontWeight: 'bold'
              }}>
                our team
              </span>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Operations Lead</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '1rem'
                }}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/ThuanTong.webp`} 
                    alt="Tống Võ Anh Thuận" 
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #7c4dff',
                      marginBottom: '1rem'
                    }}
                    loading="lazy"
                  />
                  <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>Tống Võ Anh Thuận</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Technical Lead</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '1rem'
                }}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/default.png`} 
                    alt="Lê Huỳnh Quang Vũ" 
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #b388ff',
                      marginBottom: '1rem'
                    }}
                    loading="lazy"
                  />
                  <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>Lê Huỳnh Quang Vũ</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Resource Manager</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                {[
                  { name: 'Phạm Việt Hoàng', img: 'DSC_00033.webp' },
                  { name: 'Sơn Nguyễn Kì Duyên', img: 'KyDuyen.jpg' },
                  { name: 'Trần Công Hải', img: 'TranCongHai.jpg' },
                  { name: 'Nguyễn Hoàng Lộc', img: 'NguyenHoangLoc.JPG' }
                ].map((member, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                  }}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/${member.img}`} 
                      alt={member.name} 
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${index % 2 === 0 ? '#7c4dff' : '#b388ff'}`,
                        marginBottom: '1rem'
                      }}
                      loading="lazy"
                    />
                    <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Back-end Developer</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
                }}>
                {[
                  { name: 'Đoàn Nguyễn Lâm', img: 'DoanNguyenLam.jpg' },
                  { name: 'Đặng Chí Thành', img: 'DangChiThanh.jpg' }
                ].map((member, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                  }}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/${member.img}`} 
                      alt={member.name} 
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${index % 2 === 0 ? '#7c4dff' : '#b388ff'}`,
                        marginBottom: '1rem'
                      }}
                      loading="lazy"
                    />
                    <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Social Media Manager</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: '1rem'
                }}>
                  <img 
                    src={`${process.env.PUBLIC_URL}/DoanQuocAn.jpg`} 
                    alt="Đoàn Quốc An" 
                    style={{
                      width: '200px',
                      height: '200px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #7c4dff',
                      marginBottom: '1rem'
                    }}
                    loading="lazy"
                  />
                  <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>Đoàn Quốc An</p>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Content Designer</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                {[
                  { name: 'Phạm Gia Tuệ', img: 'PhamGiaTue.jpg' },
                  { name: 'Nguyễn Thành An', img: 'ann.png' }
                ].map((member, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                  }}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/${member.img}`} 
                      alt={member.name} 
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${index % 2 === 0 ? '#7c4dff' : '#b388ff'}`,
                        marginBottom: '1rem'
                      }}
                      loading="lazy"
                    />
                    <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '4rem' }}>
              <h2 style={{
                textAlign: 'center',
                color: '#fff',
                marginBottom: '2rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>Front-end Developer</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                justifyContent: 'center'
              }}>
                {[
                  { name: 'Trương Đỗ Như Quỳnh', img: 'TruongDoNhuQuynh.jpg' },
                  { name: 'Nguyễn Thế Lập', img: 'default.png' }
                ].map((member, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                  }}>
                    <img 
                      src={`${process.env.PUBLIC_URL}/${member.img}`} 
                      alt={member.name} 
                      style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `3px solid ${index % 2 === 0 ? '#7c4dff' : '#b388ff'}`,
                        marginBottom: '1rem'
                      }}
                      loading="lazy"
                    />
                    <p style={{ color: '#fff', fontSize: '1.1rem', margin: '0.5rem 0' }}>{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              width: '100%',
              position: 'relative',
              zIndex: '1000',
              marginTop: 'auto',
              overflow: 'hidden'
            }}>
             <footer style={{
                backgroundColor: 'rgba(15, 26, 38, 0.98)',
                padding: '1.5rem 1rem',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 -2px 15px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(10px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: '800',
                  backgroundImage: 'linear-gradient(90deg, #7c4dff, #b388ff, #7c4dff)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1.5rem',
                  animation: 'gradient 8s linear infinite',
                  textShadow: '0 0 15px rgba(124, 77, 255, 0.2)'
                }}>
                  STUDY VAULT OF UIT
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'nowrap',
                  gap: '0.8rem',
                  marginBottom: '1.5rem',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}>
                  <a 
                    href="https://svuit.org/mmtt" 
                    onMouseEnter={() => setHoveredLink('docs-footer')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'docs-footer' ? '#b388ff' : '#fff',
                      textDecoration: 'none',
                      padding: '0.7rem 1.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '8px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: hoveredLink === 'docs-footer' ? 'rgba(179, 136, 255, 0.1)' : 'transparent',
                      border: '1px solid rgba(179, 136, 255, 0.2)',
                      margin: '0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Kho tài liệu
                  </a>
                  <a 
                    href="https://svuit.org/mmtt/docs/contribute" 
                    onMouseEnter={() => setHoveredLink('contribute-footer')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'contribute-footer' ? '#b388ff' : '#fff',
                      textDecoration: 'none',
                      padding: '0.7rem 1.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '8px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: hoveredLink === 'contribute-footer' ? 'rgba(179, 136, 255, 0.1)' : 'transparent',
                      border: '1px solid rgba(179, 136, 255, 0.2)',
                      margin: '0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Đóng góp
                  </a>
                  <a 
                    href="https://svuit.org/mmtt/docs/ThongBao/index" 
                    onMouseEnter={() => setHoveredLink('notify-footer')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'notify-footer' ? '#b388ff' : '#fff',
                      textDecoration: 'none',
                      padding: '0.7rem 1.4rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      borderRadius: '8px',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      background: hoveredLink === 'notify-footer' ? 'rgba(179, 136, 255, 0.1)' : 'transparent',
                      border: '1px solid rgba(179, 136, 255, 0.2)',
                      margin: '0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Thông báo
                  </a>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '0.8rem',
                marginBottom: '1.5rem'
                }}>
                  <a 
                    href="https://www.facebook.com/studyvault.uit" 
                    aria-label="Facebook"
                    onMouseEnter={() => setHoveredLink('facebook')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'facebook' ? '#4267B2' : '#fff',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      padding: '0.5rem 1rem',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      aspectRatio: '1/1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a 
                    href="https://www.youtube.com/@svuit-mmtt" 
                    aria-label="Youtube"
                    onMouseEnter={() => setHoveredLink('youtube')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'youtube' ? '#FF0000' : '#fff',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      padding: '0.5rem 1rem',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      aspectRatio: '1/1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a 
                    href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzBxqGdPrTcSJNrgxQpdJtpxNvxqtgzHNxXZcgvLCCBLZFbBrtXhnRQCKzvCXWdKWZFDfTq"
                    onMouseEnter={() => setHoveredLink('email')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'email' ? '#D44638' : '#fff',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      padding: '0.5rem 1rem',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      aspectRatio: '1/1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="far fa-envelope" aria-label="Envelope"></i>
                  </a>
                  <a 
                    href="https://github.com/SVUIT/mmtt/releases" 
                    aria-label="Github"
                    onMouseEnter={() => setHoveredLink('github')}
                    onMouseLeave={() => setHoveredLink(null)}
                    style={{
                      color: hoveredLink === 'github' ? '#333' : '#fff',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '50%',
                      backgroundColor: 'transparent',
                      aspectRatio: '1/1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <i className="fab fa-github"></i>
                  </a>
                </div>
                
                <a 
                  href="https://github.com/SVUIT/mmtt/issues/new/choose"
                  onMouseEnter={() => setHoveredLink('bug-report')}
                  onMouseLeave={() => setHoveredLink(null)}
                  style={{
                    color: hoveredLink === 'bug-report' ? '#b388ff' : '#fff',
                    fontFamily: 'Quicksand, sans-serif',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                    position: 'relative',
                    display: 'inline-block'
                  }}
                >
                  Báo cáo bug tại đây
                </a>

                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'radial-gradient(circle at 20% 30%, rgba(179, 136, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(124, 77, 255, 0.1) 0%, transparent 50%)',
                  zIndex: -1
                }} />
                
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0, 255, 199, 0.5), transparent)',
                  zIndex: 1
                }} />
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  marginTop: '2rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span> {new Date().getFullYear()} SVUIT MMTT</span>
                  <span style={{ opacity: 0.3 }}>•</span>
                  <span>All rights reserved</span>
                </div>
              </footer>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}

export default App;
