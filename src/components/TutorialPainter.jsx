import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import useChuckStore from "../store/chuckStore";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const TutorialPainter = () => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const { camera, gl, scene } = useThree();
  const raycastingRef = useRef(new THREE.Raycaster());

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
    }
  };

  const chuckItems = chuckPositionsList.map((state, index) => {
    const { position, quaternion } = state;

    return (
      <React.Fragment key={index}>
        {index % 2 === 0 ? (
          <Chuck
            color="#ff0000"
            position={position}
            quaternion={quaternion}
            onPointerDown={handleClickChuck}
          />
        ) : (
          <ReverseChuck
            color="#008000"
            position={position}
            quaternion={quaternion}
            onPointerDown={handleClickChuck}
          />
        )}
      </React.Fragment>
    );
  });

  return (
    <>
      <directionalLight
        color="#f0f6ff"
        intensity={1.5}
        position={[0, 0, 5]}
        shadow-radius={1}
      />
      <ambientLight color="#ffffff" intensity={2} />
      {chuckItems}
      <OrbitControls />
    </>
  );
};

export default TutorialPainter;
