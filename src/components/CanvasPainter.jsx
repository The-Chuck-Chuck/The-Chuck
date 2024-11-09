import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Raycaster } from "three";
import useChuckStore from "../store/chuckStore";
import { makeCustomAxis, handleClickChuck } from "../utils/function";
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

  return (
    <group
      onPointerDown={(event) => {
        handleClickChuck(
          event,
          gl,
          camera,
          scene,
          raycastingRef,
          setClickedChuckInfo,
          setSelectRotateChuck
        );
      }}
      ref={groupRef}
    >
      {chuckItems}
      <OrbitControls />
    </group>
  );
};

export default CanvasPainter;
