
gsap.from("header", {
  y: -80,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});

gsap.from(".hero h2", {
  opacity: 0,
  y: 40,
  duration: 1.2,
  delay: 0.3,
  ease: "power3.out"
});

gsap.from(".hero img", {
  opacity: 0,
  scale: 0.3,
  duration: 1.3,
  delay: 0.6,
  ease: "back.out(1.7)"
});

gsap.from(".hero p", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.9,
  ease: "power2.out"
});

gsap.fromTo(".hero .btn",
  {
    opacity: 0,
    y: 20
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1,
    stagger: 0.2,
    ease: "power2.inOut"
  }
);

gsap.from(".about h2, .about p, .about-points .point, .about h3", {
  scrollTrigger: {
    trigger: ".about",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  duration: 0.9,
  stagger: 0.2,
  ease: "power3.out"
});

gsap.from("#contact h4", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
  },
  opacity: 0,
  y: 40,
  duration: 0.8
});

gsap.from("#contactlogo", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 70%",
  },
  opacity: 0,
  scale: 0.5,
  duration: 0.8,
  stagger: 0.2,
  ease: "back.out(1.6)"
});

gsap.from(".footer", {
  scrollTrigger: {
    trigger: ".footer",
    start: "top 90%",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: "power2.out"
});


gsap.fromTo(".about .btn",
  {
    opacity: 0,
    y: 20
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 1,
    stagger: 0.2,
    ease: "power2.inOut"
  }
);

gsap.to(".slider .about-image img", {
  x: -500,
  duration: 3,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true
});


