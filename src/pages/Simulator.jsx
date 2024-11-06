import { useState } from "react";
import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [chuckPositions, setChuckPositions] = useState([
    [0, 0, 0],
    [0, 0, 0],
  ]);

  return (
    <div className="text-white">
      {isOpenedInitial && <InitialSettingModal />}
      <Header />
      <main className="w-[90%] h-[100vh]">
        <SimulCanvas
          chuckPositions={chuckPositions}
          rotationAngle={rotationAngle}
        />
        <SimulController
          chuckPositions={chuckPositions}
          setChuckPositions={setChuckPositions}
          setRotationAngle={setRotationAngle}
        />
      </main>
    </div>
  );
};

export default Simulator;
