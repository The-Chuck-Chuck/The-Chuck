import { useState } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";
import Modal from "./Modal";
import left from "../asset/left-rotate.svg";
import right from "../asset/right-rotate.svg";

const SimulController = ({
  clickedChuckInfo,
  sceneAngle,
  setRotationAngle,
  setIsRotating,
  setIsCameraRotate,
  setSceneAngle,
}) => {
  const [isOpenedSelected, setIsOpenedSelected] = useState(false);
  const { setChuckPositionsList } = useChuckStore();

  const handleClickLeft = () => {
    if (clickedChuckInfo && !sceneAngle) {
      setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
      setIsRotating(true);
    } else if (!clickedChuckInfo) {
      setIsOpenedSelected(true);
    }
  };

  const handleClickRight = () => {
    if (clickedChuckInfo && !sceneAngle) {
      setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
      setIsRotating(true);
    } else if (!clickedChuckInfo) {
      setIsOpenedSelected(true);
    }
  };

  const handleClickViewTurn = () => {
    setIsCameraRotate(true);
    setSceneAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
  };

  const handleClickStop = () => {
    setSceneAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
    setSceneAngle(0);
  };

  const handleClickReset = () => {
    setSceneAngle(0);
    const initialValue = 24;
    let positionX = -30;

    const initialStateArray = Array.from(
      { length: initialValue },
      (_, index) => {
        const positionY = index % 2 === 0 ? 0 : 2.6;
        const position = [positionX, positionY, 0];
        const quaternion = new THREE.Quaternion(0, 0, 0, 1).toArray();
        positionX += 2.6;

        return { position, quaternion };
      }
    );

    setChuckPositionsList(initialStateArray);
  };

  return (
    <>
      {isOpenedSelected && (
        <Modal
          drection="horizontalr"
          title="Select Chuck!"
          className="w-[300px] h-[250px] top-[37%] left-[40%]"
          setIsOpened={setIsOpenedSelected}
        >
          <div className="h-[70%] flex justify-center items-center">
            회전할 도형을 선택해 주세요!
          </div>
        </Modal>
      )}
      <div className="flex flex-col gap-4 fixed bottom-4 right-4 w-[250px] rounded-md bg-slate-600 p-5 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="pl-[2%] pr-[10%] text-center font-bold text-lg">회전</p>
          <button className="pr-[5%]" onClick={handleClickLeft}>
            <img src={left} className="h-13 p-1" />
          </button>
          <button onClick={handleClickRight}>
            <img src={right} className="h-13 p-1" />
          </button>
        </div>
        <div className="w-[90%] flex gap-2 items-center">
          <Button className="grow h-10 p-1" clickHandler={handleClickViewTurn}>
            전체 회전
          </Button>
          <Button className="grow h-10 p-1" clickHandler={handleClickStop}>
            멈춤
          </Button>
        </div>
        <div className="w-[90%] flex gap-2 justify-center items-center">
          <button
            className="w-[100%] h-10 p-1 text-white font-bold rounded-md border-4 hover:bg-red-600"
            onClick={handleClickReset}
          >
            초기화
          </button>
        </div>
      </div>
    </>
  );
};

export default SimulController;
