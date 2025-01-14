gsap.registerPlugin(ScrollTrigger);

const balls = document.querySelectorAll('.image-ball1, .image-ball2, .image-ball3, .image-ball4, .image-ball5, .image-ball6, .image-ball7, .image-ball8, .image-ball9');
const positionsBall = [
    { x1: 0, y1: 50, x2: 0, y2: 100, x3: 0, y3: 150, x4: 0, y4: 200, x5: 0, y5: 250, x6: 0, y6: 300, x7: 0, y7: 350, x8: 0, y8: 400, x9: 0, y9: 450 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },
    { x1: 0, y1: 400, x2: 0, y2: 500, x3: 0, y3: 600, x4: 0, y4: 700, x5: 0, y5: 800, x6: 0, y6: 900, x7: 0, y7: 1000, x8: 0, y8: 1100, x9: 0, y9: 1200 },

];

balls.forEach((imageball, index) => {
    const position = positionsBall[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: imageball,
            start: "top center",
            end: "bottom top",
            scrub: true,
            toggleActions: "play none none none",
            onUpdate: (self) => {
                if (self.progress >= 0.5) { 
                    gsap.to(imageball, {
                        x: position.x1, y: position.y1, duration: 1 
                    });
                } else {
                    gsap.to(imageball, {
                        x: position.x2, y: position.y2, duration: 1 
                    });
                }
            }
        }
    })
    .fromTo(imageball, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, duration: 1 })
    .to(imageball, { x: position.x2, y: position.y2, duration: 1 })
    .to(imageball, { x: position.x3, y: position.y3, duration: 1 })
    .to(imageball, { x: position.x4, y: position.y4, duration: 1 })
    .to(imageball, { x: position.x5, y: position.y5, duration: 1 })
    .to(imageball, { x: position.x6, y: position.y6, duration: 1 })
    .to(imageball, { x: position.x7, y: position.y7, duration: 1 })
    .to(imageball, { x: position.x8, y: position.y8, duration: 1 })
    .to(imageball, { x: position.x9, y: position.y9, duration: 1 });
});

const features = document.querySelectorAll('.feature');
const positionsFeature = [
    { x1: -2000, y1: 0},
    { x1: 2000, y1: 0},
];

features.forEach((feature, index) => {
    const position = positionsFeature[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: feature,
            start: "top center",
            end: "bottom center",
            scrub: true,
        }
    })
    .fromTo(feature, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, duration: 3 })
});

const ellipses = document.querySelectorAll('.ellipse');

ellipses.forEach((ellipse) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ellipse,
            start: "top 120%", 
            end: "top 90%", 
            scrub: true,
        }
    })
    .fromTo(ellipse, 
        { scale: 1, opacity: 1 },
        { scale: 10, opacity: 1, duration: 0.2 });
});

