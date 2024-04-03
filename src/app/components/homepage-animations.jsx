import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const teacher = (element) => {
  gsap.fromTo(element, 
    { opacity: 0, x: -100 }, 
    { opacity: 1, x: 0, duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 50%",
        end: "bottom",
        scrub: true,
      }
    }
  );
};

export const games = (element) => {
  gsap.fromTo(element, 
    { opacity: 0, x: 100 }, 
    { opacity: 1, x: 0, duration: 1, 
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        end: "bottom",
        scrub: true,
      }
    }
  );
};

export const ai = (element) => {
  gsap.fromTo(element, 
    { opacity: 0, x: -100 },
    { opacity: 1, x: 0, duration: 1, 
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        end: "bottom 90%",
        scrub: true,
      }
    }
  );
};
