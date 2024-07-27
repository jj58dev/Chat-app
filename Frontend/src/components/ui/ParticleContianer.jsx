import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

const ParticleContainer = () => {
  
  const options = useMemo(() => {
    return {
      "fullScreen": { "enable": false },
      "background": {
        "color": {
          "value": "224 71.4% 4.1%",
        },
      },
      "fpsLimit": 120,
      "interactivity": {
        "events": {
          "onHover": {
            "enable": true,
            "mode": "attract",
          },
          "resize": true,
        },
      },
      "particles": {
        "color": {
          "value": "#6d28d9",
        },
        "links": {
          "color": "#6d28d9",
          "distance": 150,
          "enable": true,
          "opacity": 1,
          "width": 1,
        },
        "collisions": {
          "enable": true,
        },
        "move": {
          "direction": "none",
          "enable": true,
          "outModes": {
            "default": "bounce",
          },
          "random": false,
          "speed": 1,
          "straight": false,
        },
        "number": {
          "density": {
            "enable": true,
            "area": 800,
          },
          "value": 80,
        },
        "opacity": {
          "value": 1,
        },
        "shape": {
          "type": "circle",
        },
        "size": {
          "value": { "min": 1, "max": 5 },
        },
      },
      "detectRetina": true,
    };
  }, []);
  
  const particlesInit = useCallback((engine) => {
    return loadSlim(engine);
  }, []);

  return <Particles  init={particlesInit} options={options} className="w-full h-screen absolute z-0"/>
};

export default ParticleContainer;