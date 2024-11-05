import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as CONSTANTS from "../constants/constants.js";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const SimulCanvas = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  useEffect(() => {
    const testInterval = setInterval(() => {
      setRotationAngle((preAngle) => preAngle + 90 * CONSTANTS.DEGREE);
    }, 3000);
    return () => clearInterval(testInterval);
  }, []);

  return (
    <Canvas
      camera={{
        position: [2, 5, 5],
        fov: 100,
      }}
    >
      <Chuck position={[0, 0, 0]} color="green" />
      <ReverseChuck
        position={[0, 0, 0]}
        color="red"
        rotationAngle={rotationAngle}
      />
      <OrbitControls />
      <axesHelper scale={10} />
    </Canvas>
  );
};

export default SimulCanvas;
