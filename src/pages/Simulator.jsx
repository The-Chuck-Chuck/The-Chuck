import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);

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
          <SimulCanvas rotationAngle={rotationAngle} />
        </Canvas>
        <SimulController setRotationAngle={setRotationAngle} />
      </main>
    </div>
  );
};

export default Simulator;
