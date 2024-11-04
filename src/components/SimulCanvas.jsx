import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const SimulCanvas = () => {
  return (
    <Canvas>
      <OrbitControls />
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 3]} />
        <meshBasicMaterial color="#2e7e62" />
      </mesh>
    </Canvas>
  );
};

export default SimulCanvas;
