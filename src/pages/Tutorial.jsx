import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import TutorialPainter from "../components/TutorialPainter";
import TutorialController from "../components/TutorialController";
import { clickedButton, selectedIndex } from "../utils/makeDogTutorial";

const Tutorial = () => {
  const indexRef = useRef(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [orderIndex, setOrderIndex] = useState(selectedIndex[0]);
  const [orderButton, setOrderButton] = useState(clickedButton[0]);
  const [isComplatedIndex, setIsComplatedIndex] = useState(false);
  const [isComplatedButton, setIsComplatedButton] = useState(false);

  return (
    <div className="text-white">
      <Header />
      <main className="w-[100%] h-[100vh]">
        <Canvas
          camera={{
            position: [0, 40, 40],
            fov: 50,
          }}
        >
          <TutorialPainter
            rotationAngle={rotationAngle}
            orderIndex={orderIndex}
            isComplatedIndex={isComplatedIndex}
            isComplatedButton={isComplatedButton}
            setRotationAngle={setRotationAngle}
            setOrderIndex={setOrderIndex}
            setIsComplatedIndex={setIsComplatedIndex}
            setOrderButton={setOrderButton}
            setIsComplatedButton={setIsComplatedButton}
            indexRef={indexRef}
          />
        </Canvas>
        <TutorialController
          orderButton={orderButton}
          isComplatedIndex={isComplatedIndex}
          isComplatedButton={isComplatedButton}
          setRotationAngle={setRotationAngle}
          setIsComplatedButton={setIsComplatedButton}
        />
      </main>
    </div>
  );
};

export default Tutorial;
