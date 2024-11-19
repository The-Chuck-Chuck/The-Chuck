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
  const [orderIndex, setOrderIndex] = useState(selectedIndex[0]);
  const [orderButton, setOrderButton] = useState(clickedButton[0]);
  const [isComplatedIndex, setIsComplatedIndex] = useState(false);
  const [isComplatedButton, setIsComplatedButton] = useState(false);
  const [isComplatedTutorial, setIsComplatedTutorial] = useState(false);
  const navigate = useNavigate();

  const handleClickBackHome = () => {
    navigate("/");
  };

  return (
    <div className="text-white">
      {isOpenedTutorialModal && <StartTutorialModal />}
      {isComplatedTutorial && (
        <Modal
          drection="horizontal"
          title="Done!"
          setIsOpened={setIsComplatedTutorial}
        >
          <div className="text-center text-lg font-semibold mt-16 h-[40%]">
            튜토리얼을 모두 완료했습니다!
          </div>
          <Button clickHandler={handleClickBackHome} className="p-2 text-md">
            Home으로 돌아가기
          </Button>
        </Modal>
      )}
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
            setIsComplatedTutorial={setIsComplatedTutorial}
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
