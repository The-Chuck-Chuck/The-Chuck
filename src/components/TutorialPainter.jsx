import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis, updateChuckData } from "../utils/chuckUtils";
import { clickedButton, selectedIndex } from "../utils/makeDogTutorial";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const TutorialPainter = ({
  rotationAngle,
  orderIndex,
  isComplatedIndex,
  setRotationAngle,
  setOrderIndex,
  setIsComplatedIndex,
  setOrderButton,
  setIsComplatedButton,
  setIsComplatedTutorial,
  indexRef,
}) => {
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const { camera, gl, scene } = useThree();
  const raycastingRef = useRef(new THREE.Raycaster());
  const rotateGroupRef = useRef(new THREE.Group());
  const nonRotateGroupRef = useRef(new THREE.Group());
  const pivotRef = useRef(new THREE.Group());
  const currentRotationAngleRef = useRef(0);
  const stopTriggerRef = useRef(false);
  const [customAxis, setCustomAxis] = useState(null);
  const [clickedChuckInfo, setClickedChuckInfo] = useState(null);
  const [nextChuckInfo, setNextChuckInfo] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  let chuckItems = null;
  let rotateGroupItems = null;
  let nonRotateGroupItems = null;

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

      let clickIndex = null;

      chuckPositionsList.forEach((state, index) => {
        const position = state.position;
        const clickedPosition = [
          clickedObject.position.x,
          clickedObject.position.y,
          clickedObject.position.z,
        ];

        if (
          JSON.stringify(position[0]) === JSON.stringify(clickedPosition[0])
        ) {
          clickIndex = index;
        }

        if (clickIndex + 1 === index) {
          setNextChuckInfo(state.position);
        }
      });

      if (orderIndex === clickIndex) {
        setIsComplatedIndex(true);
      }
    }
  };

  useEffect(() => {
    if (isComplatedIndex) {
      const axistoss = makeCustomAxis(clickedChuckInfo.position, nextChuckInfo);

      setCustomAxis(axistoss);

      pivotRef.current.position.copy(clickedChuckInfo.position);

      rotateGroupRef.current.position.set(
        -clickedChuckInfo.position.x,
        -clickedChuckInfo.position.y,
        -clickedChuckInfo.position.z
      );
    }
  }, [orderIndex, clickedChuckInfo]);

  useFrame(() => {
    if (
      customAxis &&
      rotationAngle !== 0 &&
      Math.abs(currentRotationAngleRef.current - rotationAngle) > 0.01
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
      rotationAngle !== 0 &&
      customAxis &&
      Math.abs(currentRotationAngleRef.current - rotationAngle) <= 0.01
    ) {
      setUpdateTrigger(true);
      setRotationAngle(0);
      currentRotationAngleRef.current = 0;
      stopTriggerRef.current = true;
    }
  });

  useEffect(() => {
    if (updateTrigger && rotateGroupRef.current && nonRotateGroupRef.current) {
      const updatedRotateStates = updateChuckData(
        rotateGroupRef.current.children
      );
      const updatedNonRotateStates = updateChuckData(
        nonRotateGroupRef.current.children
      );

      const updateTotalChuckData = [
        ...updatedRotateStates,
        ...updatedNonRotateStates,
      ];

      setChuckPositionsList(updateTotalChuckData);
      setUpdateTrigger(false);
      setIsComplatedIndex(false);
      setIsComplatedButton(false);

      indexRef.current = indexRef.current + 1;

      setOrderIndex(selectedIndex[indexRef.current]);
      setOrderButton(clickedButton[indexRef.current]);

      if (selectedIndex[indexRef.current] === undefined) {
        setIsComplatedTutorial(true);
      }
    }
  }, [updateTrigger]);

  if (!isComplatedIndex) {
    chuckItems = chuckPositionsList.map((state, index) => {
      const { position, quaternion } = state;
      const clickedIndex = orderIndex === index;

      return (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            <Chuck
              color="#ff0000"
              position={position}
              quaternion={quaternion}
              onPointerDown={handleClickChuck}
              highlightOn={clickedIndex}
              clickedIndex={clickedIndex}
            />
          ) : (
            <ReverseChuck
              color="#008000"
              position={position}
              quaternion={quaternion}
              onPointerDown={handleClickChuck}
              highlightOn={clickedIndex}
              clickedIndex={clickedIndex}
            />
          )}
        </React.Fragment>
      );
    });
  } else {
    rotateGroupItems = chuckPositionsList
      .slice(0, orderIndex + 1)
      .map((state, index) => {
        const { position, quaternion } = state;
        const highlightOn = true;
        const clickedIndex = orderIndex === index;

        return (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <Chuck
                color="#ff0000"
                position={position}
                quaternion={quaternion}
                highlightOn={highlightOn}
                clickedIndex={clickedIndex}
              />
            ) : (
              <ReverseChuck
                color="#008000"
                position={position}
                quaternion={quaternion}
                highlightOn={highlightOn}
                clickedIndex={clickedIndex}
              />
            )}
          </React.Fragment>
        );
      });

    nonRotateGroupItems = chuckPositionsList
      .slice(orderIndex + 1)
      .map((state, index) => {
        const { position, quaternion } = state;

        return (
          <React.Fragment key={index}>
            {(orderIndex + 1 + index) % 2 === 0 ? (
              <Chuck
                color="#ff0000"
                position={position}
                quaternion={quaternion}
              />
            ) : (
              <ReverseChuck
                color="#008000"
                position={position}
                quaternion={quaternion}
              />
            )}
          </React.Fragment>
        );
      });
  }

  return (
    <>
      <directionalLight
        color="#f0f6ff"
        intensity={1.5}
        position={[0, 0, 5]}
        shadow-radius={1}
      />
      <ambientLight color="#ffffff" intensity={2} />
      {isComplatedIndex ? (
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
    </>
  );
};

export default TutorialPainter;
