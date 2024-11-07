import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import CanvasPainter from "../components/CanvasPainter";
import Header from "../components/Header";
import SimulController from "../components/SimulController";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState([]);
  const [selectRotateChuck, setSelectRotateChuck] = useState(null);

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
            setClickedChuckInfo={setClickedChuckInfo}
            setSelectRotateChuck={setSelectRotateChuck}
          />
        </Canvas>
        <SimulController
          setRotationAngle={setRotationAngle}
          clickedChuckInfo={clickedChuckInfo}
          selectRotateChuck={selectRotateChuck}
          setSelectRotateChuck={setSelectRotateChuck}
        />
      </main>
    </div>
  );
};

export default Simulator;
