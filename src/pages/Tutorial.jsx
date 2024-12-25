import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Modal from "../components/Modal";
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
        <Modal
          drection="horizontal"
          title="Done!"
          setIsOpened={setIsCompletedTutorial}
        >
          <div className="text-center text-lg font-semibold mt-16 h-[40%]">
            튜토리얼을 모두 완료했습니다!
          </div>
          <Button clickHandler={handleClickBackHome} className="p-2 text-md">
            Home으로 돌아가기
          </Button>
        </Modal>
      )}
      <Header isTutorial={true} />
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
