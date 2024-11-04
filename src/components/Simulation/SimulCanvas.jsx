import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Chuck from "./Chuck";

const SimulCanvas = () => {
  return (
    <Canvas>
      <Chuck position={[0, 0, 0]} color="green" />
      <OrbitControls />
    </Canvas>
  );
};

export default SimulCanvas;
