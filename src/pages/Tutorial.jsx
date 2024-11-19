import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import Header from "../components/Header";
import TutorialController from "../components/TutorialController";
import TutorialPainter from "../components/TutorialPainter";

const Tutorial = () => {
  const [rotationAngle, setRotationAngle] = useState(0);

  return (
    <div className="text-white">
      <Header />
      <main className="w-[100%] h-[100vh]">
        <Canvas
          camera={{
            position: [0, 40, 40],
            fov: 60,
          }}
        >
          <TutorialPainter
            rotationAngle={rotationAngle}
            setRotationAngle={setRotationAngle}
          />
        </Canvas>
        <TutorialController
          rotationAngle={rotationAngle}
          setRotationAngle={setRotationAngle}
        />
      </main>
    </div>
  );
};

export default Tutorial;
