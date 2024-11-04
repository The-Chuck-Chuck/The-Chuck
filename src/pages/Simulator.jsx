import Header from "../components/Header";
import SimulCanvas from "../components/SimulCanvas";
import SimulController from "../components/SimulController";

const Simulator = () => {
  return (
    <div className="text-white">
      <Header />
      <main className="w-[100%] h-[100vh]">
        <SimulCanvas />
        <SimulController />
      </main>
    </div>
  );
};

export default Simulator;
