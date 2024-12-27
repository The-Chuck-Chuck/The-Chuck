import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import TutorialController from "../components/TutorialController";
import TutorialPainter from "../components/TutorialPainter";
import usePageStore from "../store/pageStore";
import { clickedButton, selectedIndex } from "../utils/makeDogTutorial";
import StartTutorialModal from "./Modal/StartTutorialModal";

const Tutorial = () => {
  const isOpenedTutorialModal = usePageStore(
    (state) => state.isOpenedTutorialModal
  );
  const indexRef = useRef(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [essentialClickIndex, setEssentialClickIndex] = useState(
    selectedIndex[0]
  );
  const [essentialClickButton, setEssentialClickButton] = useState(
    clickedButton[0]
  );
  const [isCompletedIndex, setIsCompletedIndex] = useState(false);
  const [isCompletedButton, setIsCompletedButton] = useState(false);
  const [isCompletedTutorial, setIsCompletedTutorial] = useState(false);
  const navigate = useNavigate();

  const handleClickBackHome = () => {
    navigate("/");
  };

  return (
    <div className="text-white w-screen h-screen">
      {isOpenedTutorialModal && <StartTutorialModal />}

      {isCompletedTutorial && (
        <Button
          clickHandler={handleClickBackHome}
          className="z-10 flex fixed bottom-10 right-[45%] p-3 text-xl"
        >
          Home으로 돌아가기
        </Button>
      )}
      <Header isTutorial={true} isCompletedTutorial={isCompletedTutorial} />
      <main className="w-[100%] h-[100vh]">
        <Canvas
          camera={{
            position: [0, 40, 40],
            fov: 50,
          }}
        >
          <TutorialPainter
            rotationAngle={rotationAngle}
            essentialClickIndex={essentialClickIndex}
            isCompletedIndex={isCompletedIndex}
            isCompletedButton={isCompletedButton}
            setRotationAngle={setRotationAngle}
            setEssentialClickIndex={setEssentialClickIndex}
            setIsCompletedIndex={setIsCompletedIndex}
            setEssentialClickButton={setEssentialClickButton}
            setIsCompletedButton={setIsCompletedButton}
            setIsCompletedTutorial={setIsCompletedTutorial}
            indexRef={indexRef}
          />
        </Canvas>
        <TutorialController
          essentialClickButton={essentialClickButton}
          isCompletedIndex={isCompletedIndex}
          isCompletedButton={isCompletedButton}
          setRotationAngle={setRotationAngle}
          setIsCompletedButton={setIsCompletedButton}
        />
      </main>
    </div>
  );
};

export default Tutorial;
