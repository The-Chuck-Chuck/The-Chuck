import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";

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
