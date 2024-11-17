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
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);

  useEffect(() => {
    let positionMatch = [];

    if (clickedChuckInfo) {
      positionMatch.push(
        clickedChuckInfo.position.x,
        clickedChuckInfo.position.y,
        clickedChuckInfo.position.z
      );

      chuckPositionsList.forEach((state, index) => {
        const position = state.position;
        if (JSON.stringify(position[0]) === JSON.stringify(positionMatch[0])) {
          setTargetIndex(index);
        }
      });
    }
  }, [clickedChuckInfo]);

  return (
    <div className="text-white">
      {isOpenedInitial && <InitialSettingModal />}
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
            position: [0, 15, 15],
            fov: 100,
          }}
        >
          <CanvasPainter
            rotationAngle={rotationAngle}
            clickedChuckInfo={clickedChuckInfo}
            targetIndex={targetIndex}
            setTargetIndex={setTargetIndex}
            setClickedChuckInfo={setClickedChuckInfo}
            setRotationAngle={setRotationAngle}
          />
        </Canvas>
        <SimulController
          clickedChuckInfo={clickedChuckInfo}
          setRotationAngle={setRotationAngle}
        />
      </main>
    </div>
  );
};

export default Simulator;
