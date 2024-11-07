import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const SimulCanvas = ({ rotationAngle }) => {
  const raycastingRef = useRef(new Raycaster());
  const { camera, gl, scene } = useThree();

  const handleClickChuck = (event) => {
    event.stopPropagation();
    const mouseClick = new THREE.Vector2(
      (event.offsetX / gl.domElement.clientWidth) * 2 - 1,
      -(event.offsetY / gl.domElement.clientHeight) * 2 + 1
    );
    raycastingRef.current.setFromCamera(mouseClick, camera);
    raycastingRef.current.precision = 0.000001;

    let intersects = raycastingRef.current.intersectObjects(
      scene.children,
      true
    );
    intersects = intersects.filter((intersect) => intersect.object.isMesh);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      const { position, color } = clickedObject.userData;
    }
  };

  return (
    <group onPointerDown={handleClickChuck}>
      <Chuck position={[0, 0, 0]} color="green" rotationAngle={rotationAngle} />
      <ReverseChuck
        position={[0, 0, 0]}
        color="red"
        rotationAngle={rotationAngle}
      />
      <Chuck position={[2, 0, 0]} color="green" rotationAngle={rotationAngle} />
      <OrbitControls />
    </group>
  );
};

export default SimulCanvas;
