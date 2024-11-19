import { useState } from "react";
import * as CONSTANTS from "../constants/constants";
import Button from "./Button";
import Modal from "./Modal";

const SimulController = ({
  clickedChuckInfo,
  setRotationAngle,
  setIsRotating,
}) => {
  const [isOpenedSelected, setIsOpenedSelected] = useState(false);

  const handleClickLeft = () => {
    if (clickedChuckInfo) {
      setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
      setIsRotating(true);
    } else if (!clickedChuckInfo) {
      setIsOpenedSelected(true);
    }
  };

  const handleClickRight = () => {
    if (clickedChuckInfo) {
      setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
      setIsRotating(true);
    } else if (!clickedChuckInfo) {
      setIsOpenedSelected(true);
    }
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
          <p className="pl-[2%] pr-[15%] text-center font-bold text-lg">
            Turn!
          </p>
          <Button className="h-10 p-1" clickHandler={handleClickLeft}>
            Left
          </Button>
          <Button className="h-10 p-1" clickHandler={handleClickRight}>
            Right
          </Button>
        </div>
      </div>
    </>
  );
};

export default SimulController;
