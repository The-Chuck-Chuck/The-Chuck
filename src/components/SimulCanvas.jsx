import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const SimulCanvas = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [groupRotation, setGroupRotation] = useState([]);
  const groupRef1 = useRef();

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
      <group ref={groupRef1}>
        <Chuck position={[0, -1, -1]} color="green" />
        <Chuck position={[2, -1, -1]} color="red" rotation={[0, 0, 1.05]} />
        <Chuck position={[2, -1, -1]} color="green" />
      </group>
      <OrbitControls />
    </Canvas>
  );
};

export default SimulCanvas;
