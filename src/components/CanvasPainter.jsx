import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis, updateChuckData } from "../utils/chuckUtils";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const CanvasPainter = ({
  targetIndex,
  rotationAngle,
  clickedChuckInfo,
  setClickedChuckInfo,
  setTargetIndex,
  setRotationAngle,
}) => {
  const { camera, gl, scene } = useThree();
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const raycastingRef = useRef(new Raycaster());
  const rotateGroupRef = useRef(new THREE.Group());
  const nonRotateGroupRef = useRef(new THREE.Group());
  const pivotRef = useRef(new THREE.Group());
  const currentRotationAngleRef = useRef(0);
  const stopTriggerRef = useRef(false);
  const [customAxis, setCustomAxis] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  let chuckItems = null;
  let rotateGroupItems = null;
  let nonRotateGroupItems = null;

  useEffect(() => {
    if (clickedChuckInfo && targetIndex) {
      const axistoss = makeCustomAxis(targetIndex);

      setCustomAxis(axistoss);

      pivotRef.current.position.copy(clickedChuckInfo.position);

      rotateGroupRef.current.position.set(
        -clickedChuckInfo.position.x,
        -clickedChuckInfo.position.y,
        -clickedChuckInfo.position.z
      );
    }
  }, [targetIndex, clickedChuckInfo]);

  useFrame(() => {
    if (
      customAxis &&
      Math.abs(currentRotationAngleRef.current - rotationAngle) > 0.01 &&
      rotationAngle !== 0
    ) {
      currentRotationAngleRef.current = THREE.MathUtils.lerp(
        currentRotationAngleRef.current,
        rotationAngle,
        0.04
      );

      const customRotation = new THREE.Quaternion();

      customRotation.setFromAxisAngle(
        customAxis,
        currentRotationAngleRef.current
      );

      pivotRef.current.quaternion.copy(customRotation);

      stopTriggerRef.current = false;
    } else if (
      !stopTriggerRef.current &&
      Math.abs(currentRotationAngleRef.current - rotationAngle) <= 0.01 &&
      customAxis &&
      rotationAngle !== 0
    ) {
      setUpdateTrigger(true);
      setTargetIndex(null);
      setRotationAngle(0);
      currentRotationAngleRef.current = 0;
      stopTriggerRef.current = true;
    }
  });

  useEffect(() => {
    if (updateTrigger) {
      const updatedRotateStates = updateChuckData(rotateGroupRef);
      const updatedNonRotateStates = updateChuckData(nonRotateGroupRef);

      const updateTotalChuckData = [
        ...updatedRotateStates,
        ...updatedNonRotateStates,
      ];

      setChuckPositionsList(updateTotalChuckData);
      setUpdateTrigger(false);
    }
  }, [updateTrigger]);

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

  if (targetIndex === null) {
    chuckItems = chuckPositionsList.map((state, index) => {
      const { position, quaternion } = state;

      return (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            <Chuck
              color="red"
              position={position}
              quaternion={quaternion}
              onPointerDown={handleClickChuck}
            />
          ) : (
            <ReverseChuck
              color="green"
              position={position}
              quaternion={quaternion}
              onPointerDown={handleClickChuck}
            />
          )}
        </React.Fragment>
      );
    });
  } else {
    rotateGroupItems = chuckPositionsList
      .slice(0, targetIndex + 1)
      .map((state, index) => {
        const { position, quaternion } = state;

        return (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <Chuck
                color="red"
                position={position}
                quaternion={quaternion}
                onPointerDown={handleClickChuck}
                rotationAngle={rotationAngle}
              />
            ) : (
              <ReverseChuck
                color="green"
                position={position}
                quaternion={quaternion}
                onPointerDown={handleClickChuck}
                rotationAngle={rotationAngle}
              />
            )}
          </React.Fragment>
        );
      });

    nonRotateGroupItems = chuckPositionsList
      .slice(targetIndex + 1)
      .map((state, index) => {
        const { position, quaternion } = state;

        return (
          <React.Fragment key={index}>
            {(targetIndex + 1 + index) % 2 === 0 ? (
              <Chuck
                color="red"
                position={position}
                quaternion={quaternion}
                onPointerDown={handleClickChuck}
              />
            ) : (
              <ReverseChuck
                color="green"
                position={position}
                quaternion={quaternion}
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
            <group ref={rotateGroupRef}>{rotateGroupItems}</group>
          </group>
          <group ref={nonRotateGroupRef}>{nonRotateGroupItems}</group>
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
