import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis } from "../utils/chuckUtils";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const CanvasPainter = ({
  groupRef,
  selectGroupRef,
  rotationAngle,
  clickedChuckInfo,
  chuckPositionByCalculating,
  selectRotateChuck,
  setClickedChuckInfo,
  setSelectRotateChuck,
}) => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const raycastingRef = useRef(new Raycaster());
  const { camera, gl, scene } = useThree();
  const [customAxis, setCustomAxis] = useState(null);
  const currentRotationAngle = useRef(0);
  const worldPosition = new THREE.Vector3();
  const worldRotation = new THREE.Quaternion();

  const chuckItems = chuckPositionsList.map((position, index) => {
    const name = index % 2 === 0 ? "stand" : "reverse";
    const applyRotationAngle =
      JSON.stringify(position) === JSON.stringify(chuckPositionByCalculating)
        ? rotationAngle
        : null;

    return (
      <React.Fragment key={index}>
        {name === "stand" ? (
          <Chuck
            color="red"
            position={position}
            rotationAngle={applyRotationAngle}
            name="stand"
            customAxis={customAxis}
          />
        ) : (
          <ReverseChuck
            color="green"
            position={position}
            rotationAngle={applyRotationAngle}
            name="reverse"
            customAxis={customAxis}
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
      setClickedChuckInfo(clickedObject);
      setSelectRotateChuck(null);
    }

    if (selectGroupRef.current.children.length) {
      const copiedSelectGroupRef = Array.from(selectGroupRef.current.children);

      copiedSelectGroupRef.forEach((mesh) => {
        mesh.getWorldPosition(worldPosition);
        mesh.getWorldQuaternion(worldRotation);

        mesh.position.copy(worldPosition);
        mesh.quaternion.copy(worldRotation);

        selectGroupRef.current.remove(mesh);
        groupRef.current.add(mesh);
      });

      groupRef.current.remove(selectGroupRef.current);
    }
  };

  useFrame(() => {
    if (customAxis && currentRotationAngle !== rotationAngle) {
      currentRotationAngle.current = THREE.MathUtils.lerp(
        currentRotationAngle.current,
        rotationAngle,
        0.1
      );

      const customRotation = new THREE.Quaternion();
      customRotation.setFromAxisAngle(customAxis, currentRotationAngle.current);
      selectGroupRef.current.quaternion.copy(customRotation);
    }
  });

  useEffect(() => {
    if (clickedChuckInfo.userData && selectRotateChuck) {
      const centerCoordinate = new THREE.Vector3();
      clickedChuckInfo.geometry.computeBoundingBox();
      clickedChuckInfo.geometry.boundingBox.getCenter(centerCoordinate);
      clickedChuckInfo.localToWorld(centerCoordinate);

      const vectorControl = new THREE.Vector3(0, 0, 0);
      const centerAxis = new THREE.Vector3()
        .copy(centerCoordinate)
        .add(vectorControl);
      setCustomAxis(centerAxis.normalize());
    }
  }, [clickedChuckInfo, selectRotateChuck]);
  //     const axistoss = makeCustomAxis(
  //       clickedChuckInfo.userData,
  //       selectRotateChuck
  //     );
  //     console.log("유저데이터", clickedChuckInfo.userData);
  //     setCustomAxis(axistoss);
  //   }
  // }, [clickedChuckInfo.userData, selectRotateChuck]);

  return (
    <group onPointerDown={handleClickChuck} ref={groupRef}>
      {chuckItems}
      <OrbitControls />
    </group>
  );
};

export default CanvasPainter;
