import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Simulator from "./components/Simulation/Simulator";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulation" element={<Simulator />} />
    </Routes>
  );
};

export default App;
