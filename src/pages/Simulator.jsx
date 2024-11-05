import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";
import usePageStore from "../store/pageStore";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);

  return (
    <div className="text-white">
      <Header />
      <main className="w-[90%] h-[100vh]">
        {isOpenedInitial && (
          <InitialSettingModal addClassName="top-[30%] left-[30%]" />
        )}
        <SimulCanvas />
        <SimulController />
      </main>
    </div>
  );
};

export default Simulator;
