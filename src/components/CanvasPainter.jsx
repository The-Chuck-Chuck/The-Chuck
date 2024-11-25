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
  isRotating,
  nextChuckInfo,
  iscameraMode,
  isCameraRotate,
  sceneAngle,
  setClickedChuckInfo,
  setTargetIndex,
  setRotationAngle,
  setIsRotating,
}) => {
  const { camera, gl, scene } = useThree();
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const raycastingRef = useRef(new Raycaster());
  const rotateGroupRef = useRef(new THREE.Group());
  const nonRotateGroupRef = useRef(new THREE.Group());
  const pivotRef = useRef(new THREE.Group());
  const currentRotationAngleRef = useRef(0);
  const stopTriggerRef = useRef(false);
  const lastRotationAngleRef = useRef(0);
  const cameraRef = useRef(0);
  const [customAxis, setCustomAxis] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(false);
  let chuckItems = null;
  let rotateGroupItems = null;
  let nonRotateGroupItems = null;

  useEffect(() => {
    if (clickedChuckInfo && (targetIndex || targetIndex === 0)) {
      const axistoss = makeCustomAxis(clickedChuckInfo.position, nextChuckInfo);

      setCustomAxis(axistoss);

      pivotRef.current.position.copy(clickedChuckInfo.position);

      rotateGroupRef.current.position.set(
        -clickedChuckInfo.position.x,
        -clickedChuckInfo.position.y,
        -clickedChuckInfo.position.z
      );
    }
  }, [targetIndex, clickedChuckInfo]);

  const detectConflict = () => {
    const rotateMeshes = rotateGroupRef.current.children;
    const nonRotateMeshes = nonRotateGroupRef.current.children;

    const allMeshes = [...rotateMeshes, ...nonRotateMeshes];
    const centerMap = allMeshes.map((mesh) => getCenterPosition(mesh));

    for (let i = 0; i < centerMap.length; i++) {
      for (let j = i + 1; j < centerMap.length; j++) {
        const distance = centerMap[i].distanceTo(centerMap[j]);
        if (distance < 1.55) {
          return true;
        }
      }
    }
    return false;
  };

  const getCenterPosition = (mesh) => {
    const vertex = mesh.geometry.attributes.position.array;
    const center = new THREE.Vector3();
    const tempVertex = new THREE.Vector3();

    let vertexCount = 0;

    for (let i = 0; i < vertex.length; i += 3) {
      tempVertex.set(vertex[i], vertex[i + 1], vertex[i + 2]);
      tempVertex.applyMatrix4(mesh.matrixWorld);
      center.add(tempVertex);
      vertexCount++;
    }

    center.divideScalar(vertexCount);

    return center;
  };

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
      const isConflict = detectConflict();

      if (isConflict) {
        alert("충돌 발생!");
        currentRotationAngleRef.current = lastRotationAngleRef.current;
        setRotationAngle(lastRotationAngleRef.current);
      } else {
        lastRotationAngleRef.current = rotationAngle;
        setUpdateTrigger(true);
      }

      setTargetIndex(null);
      setRotationAngle(0);
      setClickedChuckInfo(null);
      setIsRotating(false);
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
    }
  }, [updateTrigger]);

  const handleClickChuck = (event) => {
    if (isRotating) {
      return;
    }

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

  useEffect(() => {
    if (clickedChuckInfo && iscameraMode) {
      const reConfiguePosition = clickedChuckInfo.position;

      camera.position.set(
        reConfiguePosition.x + -5,
        reConfiguePosition.y + 40,
        reConfiguePosition.z + 30
      );

      cameraRef.current.target.set(
        reConfiguePosition.x,
        reConfiguePosition.y,
        reConfiguePosition.z
      );

      cameraRef.current.update();
    }
  }, [clickedChuckInfo]);

  useEffect(() => {
    if (isCameraRotate) {
      scene.rotation.z = sceneAngle;
    }
  }, [sceneAngle]);

  if (targetIndex === null) {
    chuckItems = chuckPositionsList.map((state, index) => {
      const { position, quaternion } = state;

      return (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            <Chuck
              targetIndex={targetIndex}
              index={index}
              color="#ff0000"
              position={position}
              quaternion={quaternion}
              onPointerDown={handleClickChuck}
            />
          ) : (
            <ReverseChuck
              targetIndex={targetIndex}
              index={index}
              color="#008000"
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
        const highlightOn = true;

        return (
          <React.Fragment key={index}>
            {index % 2 === 0 ? (
              <Chuck
                targetIndex={targetIndex}
                index={index}
                color="#ff0000"
                position={position}
                quaternion={quaternion}
                onPointerDown={handleClickChuck}
                highlightOn={highlightOn}
              />
            ) : (
              <ReverseChuck
                targetIndex={targetIndex}
                index={index}
                color="#008000"
                position={position}
                quaternion={quaternion}
                onPointerDown={handleClickChuck}
                highlightOn={highlightOn}
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
      <OrbitControls
        ref={cameraRef}
        autoRotate={sceneAngle ? true : false}
        autoRotateSpeed={sceneAngle ? 4.0 : 0.0}
      />
    </>
  );
};

export default CanvasPainter;
