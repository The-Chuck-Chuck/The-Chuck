import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Raycaster } from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis } from "../utils/chuckUtils";
import Chuck from "./Chuck";
import ReverseChuck from "./ReverseChuck";

const CanvasPainter = ({
  rotationAngle,
  clickedChuckInfo,
  chuckPositionByCalculating,
  selectRotateChuck,
  setClickedChuckInfo,
  setSelectRotateChuck,
}) => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const raycastingRef = useRef(new Raycaster());
  const groupRef = useRef();
  const { camera, gl, scene } = useThree();
  const [customAxis, setCustomAxis] = useState(null);

  useEffect(() => {
    if (clickedChuckInfo && selectRotateChuck) {
      const axistoss = makeCustomAxis(clickedChuckInfo, selectRotateChuck);
      setCustomAxis(axistoss);
    }
  }, [clickedChuckInfo, selectRotateChuck]);

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
      const { position, name } = clickedObject.userData;

      setClickedChuckInfo({
        position: position,
        name: name,
      });
      setSelectRotateChuck(null);
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
