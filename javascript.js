gsap.registerPlugin(ScrollTrigger);

const features = document.querySelectorAll('.feature');
const positionsFeature = [
    { x1: 0, y1: -100},
    { x1: 0, y1: -100},
];

features.forEach((feature, index) => {
    const position = positionsFeature[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: feature,
            start: "top 70%",
            end: "bottom center",
            scrub: true,
        }
    })
    .fromTo(feature, { x: 0, y: 0, scale: 1, opacity: 0 }, { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
});

const ellipses = document.querySelectorAll('.ellipse');

ellipses.forEach((ellipse) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: ellipse,
            start: "top 140%", 
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
    { x1: 0, y1: -100},
];

ellipse3.forEach((ellipse3, index) => {
    const position = positionsEllipse3[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: ellipse3,
            start: "top -10%",
            end: "bottom -20%",
            scrub: true,
        }
    })
    .fromTo(ellipse3, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, duration: 100})
});


const meets = document.querySelectorAll('.meetourteam');
const positionsMeet = [
    { x1: 0, y1: -50},
    { x1: 0, y1: -50},
];

meets.forEach((meetourteam, index) => {
    const position = positionsMeet[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: meetourteam,
            start: "top 90%",
            end: "bottom center",
            scrub: true,
        }
    })
    .fromTo(meetourteam, { x: 0, y: 0, scale: 1, opacity: 0 }, { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
});

const button = document.querySelectorAll('.btn');
const positionsBtn = [
    { x1: 0, y1: -150},
];

button.forEach((btn, index) => {
    const position = positionsBtn[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: btn,
            start: "top 70%",
            end: "bottom -30%",
            scrub: true,
        }
    })
    .fromTo(btn, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, opacity: 0, duration: 3 })
});

const abouttexts = document.querySelectorAll('.about_text');
const positionsAboutText = [
    { x1: 0, y1: -50},
    { x1: 0, y1: -50},
];

abouttexts.forEach((about_text, index) => {
    const position = positionsAboutText[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: about_text,
            start: "top 90%",
            end: "bottom center",
            scrub: true,
        }
    })
    .fromTo(about_text, { x: 0, y: 0, scale: 1, opacity: 0 }, { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
});

const aboutimage = document.querySelectorAll('.image_container');
const positionsAboutImage = [
    { x1: 0, y1: -50},
    { x1: 0, y1: -50},
    { x1: 0, y1: -50},
    { x1: 0, y1: -50},
];

aboutimage.forEach((image_container, index) => {
    const position = positionsAboutImage[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: image_container,
            start: "top 90%",
            end: "bottom center",
            scrub: true,
        }
    })
    .fromTo(image_container, { x: 0, y: 0, scale: 1, opacity: 0 }, { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
});

const heading = document.querySelectorAll('.jumbotron_heading');
const positionsHeading = [
    { x1: 0, y1: 100},
];

heading.forEach((jumbotron_heading, index) => {
    const position = positionsHeading[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: jumbotron_heading,
            start: "top 20%",
            end: "bottom 90%",
            scrub: true,
        }
    })
    .fromTo(jumbotron_heading, { x: 0, y: 0, scale: 1, opacity: 1 }, { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
});

const balls = document.querySelectorAll('.ball_element');
const positionsBall = [
    { x1: 0, y1: 100}, 
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
    { x1: 0, y1: 100},
];

balls.forEach((ball_element, index) => {
    const position = positionsBall[index];

    gsap.timeline({
        scrollTrigger: {
            trigger: ball_element,
            start: "top 1%",
            end: "bottom 1%",
            scrub: true,
        }
    })
    .fromTo(ball_element, { x: 0, y: 0, scale: 1, opacity: 1 }, 
                          { x: position.x1, y: position.y1, opacity: 1, duration: 3 })
    
});

