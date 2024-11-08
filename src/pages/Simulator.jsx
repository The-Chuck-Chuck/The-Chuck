import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import CanvasPainter from "../components/CanvasPainter";
import SimulController from "../components/SimulController";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";
import { Link } from "react-router-dom";

const Simulator = () => {
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);

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
            position: [2, 5, 5],
            fov: 100,
          }}
        >
          <CanvasPainter rotationAngle={rotationAngle} />
        </Canvas>
        <SimulController setRotationAngle={setRotationAngle} />
      </main>
    </div>
  );
};

export default Simulator;
