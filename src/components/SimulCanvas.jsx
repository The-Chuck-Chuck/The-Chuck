import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import Chuck from "../components/Chuck";

const SimulCanvas = () => {
  const [groupRotation, setGroupRotation] = useState([]);

  const groupRef1 = useRef();

  return (
    <Canvas>
      <OrbitControls />
      <group ref={groupRef1}>
        <Chuck position={[0, -1, -1]} color="green" />
        <Chuck position={[2, -1, -1]} color="red" rotation={[0, 0, 1.05]} />
        <Chuck position={[2, -1, -1]} color="green" />
      </group>
    </Canvas>
  );
};

export default SimulCanvas;
