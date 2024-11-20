import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";
import Tutorial from "./pages/Tutorial";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulator" element={<Simulator />} />
      <Route path="/tutorial" element={<Tutorial />} />
    </Routes>
  );
};

export default App;
