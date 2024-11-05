import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const SimulCanvas = ({ rotationAngle }) => {
  return (
    <Canvas
      camera={{
        position: [2, 5, 5],
        fov: 100,
      }}
    >
      <Chuck position={[0, 0, 0]} color="green" />
      <ReverseChuck
        position={[0, 0, 0]}
        color="red"
        rotationAngle={rotationAngle}
      />
      <OrbitControls />
    </Canvas>
  );
};

export default SimulCanvas;
