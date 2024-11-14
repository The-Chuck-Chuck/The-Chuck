import { OrbitControls } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis } from "../utils/chuckUtils";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const CanvasPainter = ({
  groupRef,
  rotationAngle,
  clickedChuckInfo,
  selectRotateChuck,
  setClickedChuckInfo,
  setSelectRotateChuck,
}) => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const currentRotationAngle = useRef(0);
  const raycastingRef = useRef(new Raycaster());
  const { camera, gl, scene } = useThree();
  const [customAxis, setCustomAxis] = useState(null);
  const [newPosition, setNewPosition] = useState([]);

  useEffect(() => {
    if (clickedChuckInfo && selectRotateChuck) {
      const axistoss = makeCustomAxis(clickedChuckInfo, selectRotateChuck);
      setCustomAxis(axistoss);
    }
  }, [clickedChuckInfo, selectRotateChuck]);

  useFrame(() => {
    if (customAxis && currentRotationAngle !== rotationAngle) {
      currentRotationAngle.current = THREE.MathUtils.lerp(
        currentRotationAngle.current,
        rotationAngle,
        0.02
      );

      const customRotation = new THREE.Quaternion();

      customRotation.setFromAxisAngle(customAxis, currentRotationAngle.current);
      groupRef.current.quaternion.copy(customRotation);
    }
  });

  useEffect(() => {
    const test = clickedChuckInfo.position;
    let array = [];
    if (test) {
      array.push(-test.x, -test.y, test.z);
    }
    setNewPosition(array);
  }, [clickedChuckInfo]);

  const chuckItems = chuckPositionsList.map((position, index) => {
    const name = index % 2 === 0 ? "stand" : "reverse";

    return (
      <React.Fragment key={index}>
        {name === "stand" ? (
          <Chuck color="red" position={position} name="stand" />
        ) : (
          <ReverseChuck color="green" position={position} name="reverse" />
        )}
      </React.Fragment>
    );
  });

  const handleClickChuck = (evnet) => {
    evnet.stopPropagation();

    const syncCordinater = new THREE.Vector2(
      (evnet.offsetX / gl.domElement.clientWidth) * 2 - 1,
      -(evnet.offsetY / gl.domElement.clientHeight) * 2 + 1
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

      setClickedChuckInfo(clickedObject);
      setSelectRotateChuck(null);
    }
  };

  return (
    <>
      <mesh
        onPointerDown={handleClickChuck}
        position={newPosition.length !== 0 ? newPosition : [0, 0, 0]}
      >
        {chuckItems}
      </mesh>
      <OrbitControls />
    </>
  );
};

export default CanvasPainter;
