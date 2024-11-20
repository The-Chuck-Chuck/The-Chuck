import { useState } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";
import Modal from "./Modal";

const SimulController = ({
  clickedChuckInfo,
  sceneAngle,
  setRotationAngle,
  setIsRotating,
  setIsCameraRotate,
  setSceneAngle,
}) => {
  const [isOpenedSelected, setIsOpenedSelected] = useState(false);
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );

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

  const handleClickTurn = () => {
    setIsCameraRotate(true);
    setSceneAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
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
          className="w-[300px] h-[250px] top-[35%] left-[40%]"
          setIsOpened={setIsOpenedSelected}
        >
          <div className="h-[70%] flex justify-center items-center">
            회전할 도형을 선택해 주세요!
          </div>
        </Modal>
      )}
      <div className="flex flex-col gap-4 fixed bottom-4 right-4 w-[250px] rounded-md bg-slate-600 p-5 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="pl-[2%] pr-[15%] text-center font-bold text-lg">Turn</p>
          <Button className="h-10 p-1" clickHandler={handleClickLeft}>
            Left
          </Button>
          <Button className="h-10 p-1" clickHandler={handleClickRight}>
            Right
          </Button>
        </div>
        <div className="w-[90%] flex gap-5 items-center">
          <p className="text-center font-bold text-lg">Show & Trun</p>
          <Button className="h-10 p-1" clickHandler={handleClickTurn}>
            Turn
          </Button>
        </div>
        <div className="w-[90%] flex gap-2 justify-center items-center">
          <Button className="h-10 p-1" clickHandler={handleClickReset}>
            RESET
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimulController;
