import { Canvas } from "@react-three/fiber";
import React from "react";
import Header from "../components/Header";
import TutorialPainter from "../components/TutorialPainter";

const Tutorial = () => {
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
          <TutorialPainter />
        </Canvas>
      </main>
    </div>
  );
};

export default Tutorial;
