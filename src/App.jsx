import { Route, Routes } from "react-router-dom";
import Simulation from "./components/Simulation";

const App = () => {
  return (
    <Routes>
      <Route path="/simulation" element={<Simulation />} />
    </Routes>
  );
};

export default App;
