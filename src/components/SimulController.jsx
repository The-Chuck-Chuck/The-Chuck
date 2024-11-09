import { useState } from "react";
import * as CONSTANTS from "../constants/constants";
import ResetModal from "../pages/Modal/ResetModal";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";
import {
  handleClickAdd,
  handleClickDelete,
  handleClickLeft,
  handleClickReset,
  handleClickRight,
} from "../utils/btnhandler";

const SimulController = ({
  clickedChuckInfo,
  setRotationAngle,
  selectRotateChuck,
  setSelectRotateChuck,
}) => {
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const [isOpenedReset, setIsOpenedReset] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="grow text-center font-bold text-lg">Turn!</p>
          <Button
            className="h-10 p-1"
            clickHandler={() =>
              handleClickLeft(
                clickedChuckInfo,
                selectRotateChuck,
                setSelectRotateChuck,
                setRotationAngle
              )
            }
          >
            Left
          </Button>
          <Button
            className="h-10 p-1"
            clickHandler={() =>
              handleClickRight(
                clickedChuckInfo,
                selectRotateChuck,
                setSelectRotateChuck,
                setRotationAngle
              )
            }
          >
            Right
          </Button>
        </div>
        <div className="w-[80%] flex gap-3 items-center">
          <div className="grow font-bold text-lg">length?</div>
          <div className="font-semibold">{chuckPositionsList.length}</div>
          <div className="flex gap-2">
            <Button
              clickHandler={() =>
                handleClickAdd(chuckPositionsList, setChuckPositionsList)
              }
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              + 1
            </Button>
            <Button
              clickHandler={() =>
                handleClickDelete(chuckPositionsList, setChuckPositionsList)
              }
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              - 1
            </Button>
          </div>
        </div>
        <Button
          clickHandler={() => handleClickReset(setIsOpenedReset)}
          className="w-[90%] p-2"
        >
          Reset!
        </Button>
        <Button className="w-[90%] p-2">Go Back!</Button>
      </div>
      {isOpenedReset && <ResetModal setIsOpened={setIsOpenedReset} />}
    </>
  );
};

export default SimulController;
