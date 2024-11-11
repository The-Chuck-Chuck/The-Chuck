import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import CanvasPainter from "../components/CanvasPainter";
import SimulController from "../components/SimulController";
import useChuckStore from "../store/chuckStore";
import usePageStore from "../store/pageStore";
import { findLeftRightPosition } from "../utils/chuckUtils";
import InitialSettingModal from "./Modal/InitialSettingModal";

const Simulator = () => {
  const chuckPositionsList = useChuckStore((state) => state.chuckPositionsList);
  const isOpenedInitial = usePageStore((state) => state.isOpenedModal);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [clickedChuckInfo, setClickedChuckInfo] = useState([]);
  const [selectRotateChuck, setSelectRotateChuck] = useState(null);
  const [chuckPositionByCalculating, setChuckPositionByCalculating] =
    useState();
  const groupRef = useRef();
  const selectGroupRef = useRef(new THREE.Group());

  useEffect(() => {
    const calculateRotatePosition = (
      everyChuckPosition,
      mouseClickInfo,
      btnClickInfo
    ) => {
      if (btnClickInfo) {
        const rotatePosition = findLeftRightPosition(
          everyChuckPosition,
          mouseClickInfo,
          btnClickInfo
        );
        setChuckPositionByCalculating(rotatePosition);
      }
    };

    calculateRotatePosition(
      chuckPositionsList,
      clickedChuckInfo.userData,
      selectRotateChuck
    );
  }, [selectRotateChuck]);

  return (
    <div className="text-white">
      {isOpenedInitial && <InitialSettingModal />}
      <header className="p-4">
        <Link
          to="/"
          className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
        >
          Chuck-Chuck! Simulator
        </Link>
      </header>
      <main className="w-[100%] h-[100vh]">
        <Canvas
          camera={{
            position: [0, 15, 15],
            fov: 100,
          }}
        >
          <CanvasPainter
            groupRef={groupRef}
            selectGroupRef={selectGroupRef}
            rotationAngle={rotationAngle}
            clickedChuckInfo={clickedChuckInfo}
            chuckPositionByCalculating={chuckPositionByCalculating}
            selectRotateChuck={selectRotateChuck}
            setClickedChuckInfo={setClickedChuckInfo}
            setSelectRotateChuck={setSelectRotateChuck}
          />
        </Canvas>
        <SimulController
          groupRef={groupRef}
          selectGroupRef={selectGroupRef}
          clickedChuckInfo={clickedChuckInfo}
          selectRotateChuck={selectRotateChuck}
          setRotationAngle={setRotationAngle}
          setSelectRotateChuck={setSelectRotateChuck}
        />
      </main>
    </div>
  );
};

export default Simulator;
