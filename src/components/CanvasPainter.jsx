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
  targetIndex,
  rotationAngle,
  clickedChuckInfo,
  setClickedChuckInfo,
}) => {
  const { camera, gl, scene } = useThree();
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const raycastingRef = useRef(new Raycaster());
  const groupRef = useRef(new THREE.Group());
  const pivotRef = useRef(new THREE.Group());
  const currentRotationAngle = useRef(0);
  const [customAxis, setCustomAxis] = useState(null);
  let groupedChuckItems = null;
  let ungroupedChuckItems = null;

  useEffect(() => {
    if (clickedChuckInfo && targetIndex) {
      const axistoss = makeCustomAxis(targetIndex);
      setCustomAxis(axistoss);

      pivotRef.current.position.copy(clickedChuckInfo.position);

      groupRef.current.position.set(
        -clickedChuckInfo.position.x,
        -clickedChuckInfo.position.y,
        -clickedChuckInfo.position.z
      );
    }
  }, [targetIndex]);

  useFrame(() => {
    if (customAxis && currentRotationAngle !== rotationAngle) {
      currentRotationAngle.current = THREE.MathUtils.lerp(
        currentRotationAngle.current,
        rotationAngle,
        0.02
      );

      const customRotation = new THREE.Quaternion();

      customRotation.setFromAxisAngle(customAxis, currentRotationAngle.current);
      pivotRef.current.quaternion.copy(customRotation);
    }
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
      setClickedChuckInfo(clickedObject);
    }
  };

  const chuckItems = chuckPositionsList.map((position, index) => {
    return (
      <React.Fragment key={index}>
        {index % 2 === 0 ? (
          <Chuck
            color="red"
            position={position}
            onPointerDown={handleClickChuck}
          />
        ) : (
          <ReverseChuck
            color="green"
            position={position}
            onPointerDown={handleClickChuck}
          />
        )}
      </React.Fragment>
    );
  });

  if (targetIndex !== null) {
    groupedChuckItems = chuckPositionsList
      .slice(0, targetIndex + 1)
      .map((position, index) => {
        return (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <Chuck
                color="red"
                position={position}
                onPointerDown={handleClickChuck}
                rotationAngle={rotationAngle}
              />
            ) : (
              <ReverseChuck
                color="green"
                position={position}
                onPointerDown={handleClickChuck}
                rotationAngle={rotationAngle}
              />
            )}
          </React.Fragment>
        );
      });

    ungroupedChuckItems = chuckPositionsList
      .slice(targetIndex + 1)
      .map((position, index) => {
        return (
          <React.Fragment key={index}>
            {(targetIndex + 1 + index) % 2 === 0 ? (
              <Chuck
                color="red"
                position={position}
                onPointerDown={handleClickChuck}
              />
            ) : (
              <ReverseChuck
                color="green"
                position={position}
                onPointerDown={handleClickChuck}
              />
            )}
          </React.Fragment>
        );
      });
  }

  return (
    <>
      {targetIndex !== null ? (
        <>
          <group ref={pivotRef}>
            <group ref={groupRef}>{groupedChuckItems}</group>
          </group>
          <group>{ungroupedChuckItems}</group>
        </>
      ) : (
        chuckItems
      )}
      <OrbitControls />
      <axesHelper scale={10} />
    </>
  );
};

export default CanvasPainter;
