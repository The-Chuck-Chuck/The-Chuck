import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";
import useChuckStore from "../store/chuckStore";

const CanvasPainter = ({ rotationAngle }) => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const raycastingRef = useRef(new Raycaster());
  const groupRef = useRef();
  const { camera, gl, scene } = useThree();

  const chuckItems = chuckPositionsList.map((position, index) => {
    return (
      <React.Fragment key={index}>
        {index % 2 === 0 ? (
          <Chuck color="red" position={position} />
        ) : (
          <ReverseChuck
            color="green"
            position={position}
            rotationAngle={rotationAngle}
          />
        )}
      </React.Fragment>
    );
  });

  const handleClickChuck = (event) => {
    event.stopPropagation();

    const syncCordinater = new THREE.Vector2(
      (event.offsetX / gl.domElement.clientWidth) * 2 - 1,
      -(event.offsetY / gl.domElement.clientHeight) * 2 + 1
    );
    raycastingRef.current.setFromCamera(syncCordinater, camera);
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
    <group onPointerDown={handleClickChuck} ref={groupRef}>
      {chuckItems}
      <OrbitControls />
    </group>
  );
};

export default CanvasPainter;
