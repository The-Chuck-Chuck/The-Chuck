import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CanvasPainter from "../components/CanvasPainter";
import SimulController from "../components/SimulController";
import useChuckStore from "../store/chuckStore";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const isOpenedSimulatorModal = usePageStore(
    (state) => state.isOpenedSimulatorModal
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [isRotating, setIsRotating] = useState(false);
  const [nextChuckInfo, setNextChuckInfo] = useState(null);

  useEffect(() => {
    if (clickedChuckInfo) {
      let positionMatch = [];
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
    <div className="text-white">
      {isOpenedSimulatorModal && <InitialSettingModal />}
      <header className="p-4">
        <Link
          to="/"
          className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
        >
          Chuck-Chuck! Simulator
        </Link>
      </header>
      <main className="w-[100%] h-[100vh]">
        <Canvas
          camera={{
            position: [0, 40, 40],
            fov: 60,
          }}
        >
          <CanvasPainter
            rotationAngle={rotationAngle}
            clickedChuckInfo={clickedChuckInfo}
            targetIndex={targetIndex}
            nextChuckInfo={nextChuckInfo}
            isRotating={isRotating}
            setTargetIndex={setTargetIndex}
            setClickedChuckInfo={setClickedChuckInfo}
            setRotationAngle={setRotationAngle}
            setIsRotating={setIsRotating}
          />
        </Canvas>
        <SimulController
          clickedChuckInfo={clickedChuckInfo}
          setRotationAngle={setRotationAngle}
          setIsRotating={setIsRotating}
        />
      </main>
    </div>
  );
};

export default Simulator;
