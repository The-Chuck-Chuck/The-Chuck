import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import CanvasPainter from "../components/CanvasPainter";
import Header from "../components/Header";
import SimulController from "../components/SimulController";
import useChuckStore from "../store/chuckStore";
import usePageStore from "../store/pageStore";
import StartSimulatorModal from "./Modal/StartSimulatorModal";

const Simulator = () => {
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const isOpenedSimulatorModal = usePageStore(
    (state) => state.isOpenedSimulatorModal
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [nextChuckInfo, setNextChuckInfo] = useState(null);
  const [iscameraMode, setIsCameraMode] = useState(false);
  const [isCameraRotate, setIsCameraRotate] = useState(false);
  const [sceneAngle, setSceneAngle] = useState(0);
  const { chuckData } = useParams();
  const canvasRef = useRef();

  const setCameraMode = () => {
    if (iscameraMode) {
      setIsCameraMode(false);
    } else {
      setIsCameraMode(true);
    }
  };

  useEffect(() => {
    if (chuckData) {
      const chuckLinkPositionsList = JSON.parse(atob(chuckData));

      setChuckPositionsList(chuckLinkPositionsList);
    }
  }, []);

  useEffect(() => {
    if (clickedChuckInfo) {
      const positionMatch = [];
      let nextIndex = null;

      positionMatch.push(
        clickedChuckInfo.position.x,
        clickedChuckInfo.position.y,
        clickedChuckInfo.position.z
      );

      chuckPositionsList.forEach((state, index) => {
        const position = state.position;

        if (JSON.stringify(position[0]) === JSON.stringify(positionMatch[0])) {
          nextIndex = index + 1;
          setTargetIndex(index);
        }

        if (index === nextIndex) {
          setNextChuckInfo(state.position);
        }
      });
    }
  }, [clickedChuckInfo]);

  return (
    <div className="text-white w-screen h-screen">
      {isOpenedSimulatorModal && <StartSimulatorModal />}
      <Header canvasRef={canvasRef} />
      <main className="w-[100%] h-[100vh]">
        <Button
          className={`${iscameraMode && "text-black"} fixed right-4 top-20 border-1 rounded-lg font-semibold w-40 text-md flex justify-center items-center z-10`}
          clickHandler={setCameraMode}
        >
          {`${iscameraMode ? "카메라 시점 따라가기" : "카메라 시점 고정"}`}
        </Button>
        <Canvas
          camera={{
            position: [0, 40, 40],
            fov: 60,
          }}
        >
          <CanvasPainter
            canvasRef={canvasRef}
            rotationAngle={rotationAngle}
            clickedChuckInfo={clickedChuckInfo}
            targetIndex={targetIndex}
            nextChuckInfo={nextChuckInfo}
            isRotating={isRotating}
            iscameraMode={iscameraMode}
            isCameraRotate={isCameraRotate}
            sceneAngle={sceneAngle}
            setTargetIndex={setTargetIndex}
            setClickedChuckInfo={setClickedChuckInfo}
            setRotationAngle={setRotationAngle}
            setIsRotating={setIsRotating}
          />
        </Canvas>
        <SimulController
          clickedChuckInfo={clickedChuckInfo}
          sceneAngle={sceneAngle}
          setRotationAngle={setRotationAngle}
          setIsRotating={setIsRotating}
          setIsCameraRotate={setIsCameraRotate}
          setSceneAngle={setSceneAngle}
        />
      </main>
    </div>
  );
};

export default Simulator;
