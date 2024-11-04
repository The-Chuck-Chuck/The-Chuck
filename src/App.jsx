import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Simulator from "./pages/Simulator";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulation" element={<Simulator />} />
    </Routes>
  );
};

export default App;
