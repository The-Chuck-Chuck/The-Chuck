import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";
import useStore from "../store/pageStore";
import InitialSettingModal from "./InitialSettingModal";

const Simulator = () => {
  const isOpenedModal = useStore((state) => state.isOpenedModal);

  return (
    <div className="text-white">
      <Header />
      <main className="w-[90%] h-[100vh]">
        {isOpenedModal && (
          <InitialSettingModal addClassName="top-[30%] left-[30%]" />
        )}
        <SimulCanvas />
        <SimulController />
      </main>
    </div>
  );
};

export default Simulator;
