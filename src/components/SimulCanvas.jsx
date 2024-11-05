import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Chuck from "../components/Chuck";
import { useRef, useState } from "react";

const SimulCanvas = () => {
  const [xRotation, setXRotation] = useState([]);
  const groupRef = useRef();

  const handleClickGroup = () => {
    groupRef.current.rotation.x += 1;
  };

  return (
    <>
      <Canvas>
        <OrbitControls />
        <group rotation={[3, 4, 4]} ref={groupRef}>
          <Chuck position={[0, 0, 0]} color="green" />
          <Chuck position={[2, 0, 0]} color="red" rotation={[0, 0, 1.05]} />
          <Chuck position={[2, 0, 0]} color="green" />
          <Chuck position={[4, 0, 0]} color="red" rotation={[0, 0, 1.05]} />
          <Chuck position={[4, 0, 0]} color="green" />
        </group>
        <axesHelper args={[10]} />
        <gridHelper args={[20, 20, 0xff0000, "teal"]} />
      </Canvas>
      <button
        type="button"
        onClick={handleClickGroup}
        className="fixed top-5 flex items-center justify-center w-[50px] bg-gray-500"
      >
        돌려
      </button>
    </>
  );
};

export default SimulCanvas;
