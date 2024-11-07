import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import CanvasPainter from "../components/CanvasPainter";
import Header from "../components/Header";
import SimulController from "../components/SimulController";
import useChuckStore from "../store/chuckStore";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState([]);
  const [selectRotateChuck, setSelectRotateChuck] = useState(null);
  const [chuckPositionByCalculating, setChuckPositionByCalculating] =
    useState();

  const findLeftRightPosition = (
    everyChuckPosition,
    mouseClickInfo,
    btnClickInfo
  ) => {
    let targetPosition = null;

    everyChuckPosition.forEach((value, index) => {
      if (JSON.stringify(value) === JSON.stringify(mouseClickInfo.position)) {
        if (mouseClickInfo.name === "reverse") {
          if (btnClickInfo === "left") {
            targetPosition = everyChuckPosition[index];
          } else if (btnClickInfo === "right") {
            targetPosition = everyChuckPosition[index + 1] || null;
          }
        } else if (mouseClickInfo.name === "stand") {
          if (btnClickInfo === "left") {
            targetPosition = everyChuckPosition[index - 1] || null;
          } else if (btnClickInfo === "right") {
            targetPosition = everyChuckPosition[index];
          }
        }
      }
    });

    return targetPosition;
  };

  useEffect(() => {
    const testProcessing = (
      everyChuckPosition,
      mouseClickInfo,
      btnClickInfo
    ) => {
      if (btnClickInfo) {
        const rotatePosition = findLeftRightPosition(
          everyChuckPosition,
          mouseClickInfo,
          btnClickInfo
        );
        setChuckPositionByCalculating(rotatePosition);
      }
    };

    testProcessing(chuckPositionsList, clickedChuckInfo, selectRotateChuck);
  }, [selectRotateChuck]);

  return (
    <div className="text-white">
      {isOpenedInitial && <InitialSettingModal />}
      <Header />
      <main className="w-[90%] h-[100vh]">
        <Canvas
          camera={{
            position: [2, 5, 5],
            fov: 100,
          }}
        >
          <CanvasPainter
            rotationAngle={rotationAngle}
            clickedChuckInfo={clickedChuckInfo}
            chuckPositionByCalculating={chuckPositionByCalculating}
            setClickedChuckInfo={setClickedChuckInfo}
            setSelectRotateChuck={setSelectRotateChuck}
          />
        </Canvas>
        <SimulController
          clickedChuckInfo={clickedChuckInfo}
          selectRotateChuck={selectRotateChuck}
          setRotationAngle={setRotationAngle}
          setSelectRotateChuck={setSelectRotateChuck}
        />
      </main>
    </div>
  );
};

export default Simulator;
