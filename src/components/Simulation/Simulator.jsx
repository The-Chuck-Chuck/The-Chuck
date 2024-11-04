import Header from "../Header/Header";
import SimulCanvas from "../Simulation/SimulCanvas";
import SimulController from "./SimulController";

const Simulator = () => {
  return (
    <main className="w-[100%] h-[100vh] text-white">
      <Header />
      <SimulCanvas />
      <SimulController />
    </main>
  );
};

export default Simulator;
