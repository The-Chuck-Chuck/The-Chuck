import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useRef } from "react";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const SimulCanvas = ({ chuckPositions, rotationAngle }) => {
  const groupRef = useRef();

  const chuckItems = chuckPositions.map((position, index) => {
    return (
      <React.Fragment key={index}>
        {chuckPositions.indexOf(position) === 0 ||
        chuckPositions.indexOf(position) % 2 === 0 ? (
          <Chuck color="red" position={position} />
        ) : (
          <ReverseChuck
            color="green"
            position={position}
            rotationAngle={rotationAngle}
          />
        )}
      </React.Fragment>
    );
  });

  return (
    <Canvas
      camera={{
        position: [2, 5, 5],
        fov: 100,
      }}
    >
      <group ref={groupRef}>{chuckItems}</group>
      <OrbitControls />
    </Canvas>
  );
};

export default SimulCanvas;
