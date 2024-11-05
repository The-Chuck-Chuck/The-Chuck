import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Chuck from "../components/Chuck";
import { useRef, useState } from "react";

const SimulCanvas = () => {
  const [groupRotation, setGroupRotation] = useState([]);
  const rotateVector = new THREE.Vector3(18, -3.14, -0.3).normalize();
  const rotateVector2 = new THREE.Vector3(26, -1.14, -0.3).normalize();

  const groupRef1 = useRef();
  const groupRef2 = useRef();
  const groupRef3 = useRef();

  const handleClickGroup = () => {
    groupRef1.current.rotation.z += 1;
    setGroupRotation();
  };

  const handleClickGroup2 = () => {
    groupRef2.current.rotateOnWorldAxis(rotateVector, Math.PI / 2);
    setGroupRotation();
  };

  const handleClickGroup3 = () => {
    groupRef3.current.rotateOnWorldAxis(rotateVector2, Math.PI / 2);
    setGroupRotation();
  };

  return (
    <>
      <Canvas>
        <OrbitControls />
        <group ref={groupRef1}>
          <Chuck position={[0, -1, -1]} color="green" />
          <Chuck position={[2, -1, -1]} color="red" rotation={[0, 0, 1.05]} />
          <group ref={groupRef2}>
            <Chuck position={[2, -1, -1]} color="green" />
            <Chuck position={[4, -1, -1]} color="red" rotation={[0, 0, 1.05]} />
            <Chuck position={[4, -1, -1]} color="green" />
            <Chuck position={[6, -1, -1]} color="red" rotation={[0, 0, 1.05]} />
            <group ref={groupRef3}>
              <Chuck position={[6, -1, -1]} color="green" />
              <Chuck
                position={[8, -1, -1]}
                color="red"
                rotation={[0, 0, 1.05]}
              />
              <Chuck position={[8, -1, -1]} color="green" />
            </group>
          </group>
        </group>
        <axesHelper args={[10]} />
        <gridHelper args={[20, 20, 0xff0000, "teal"]} />
      </Canvas>
      <button
        type="button"
        onClick={handleClickGroup}
        className="fixed top-2 flex items-center justify-center w-[100px] bg-gray-500"
      >
        그룹1 돌려
      </button>
      <button
        type="button"
        onClick={handleClickGroup2}
        className="fixed top-10 flex items-center justify-center w-[100px] bg-gray-500"
      >
        그룹2 돌려
      </button>
      <button
        type="button"
        onClick={handleClickGroup3}
        className="fixed top-[75px] flex items-center justify-center w-[100px] bg-gray-500"
      >
        그룹3 돌려
      </button>
    </>
  );
};

export default SimulCanvas;
