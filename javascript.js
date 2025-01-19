gsap.registerPlugin(ScrollTrigger);

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

const ellipse3 = document.querySelectorAll('.ellipse3');
const positionsEllipse3 = [
    { x1: 0, y1: -200},
];

ellipse3.forEach((ellipse3, index) => {
    const position = positionsEllipse3[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: ellipse3,
            start: "top -10%",
            end: "bottom -50%",
            scrub: true,
        }
    })
    .fromTo(ellipse3, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, duration: 100})
});



