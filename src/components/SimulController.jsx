import { useState } from "react";
import * as CONSTANTS from "../constants/constants";
import ResetModal from "../pages/Modal/ResetModal";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";

const SimulController = ({ setRotationAngle }) => {
  const { chuckPositions, setChuckPositions } = useChuckStore();
  const [isOpenedReset, setIsOpenedReset] = useState(false);

  const handleClickReset = () => {
    setIsOpenedReset(true);
  };

  const handleClickRotateRight = () => {
    setRotationAngle((preAngle) => preAngle + 90 * CONSTANTS.DEGREE);
  };

  const handleClickAdd = () => {
    if (chuckPositions.length >= 50) {
      alert("최대 개수는 50개입니다.");
      return;
    } else {
      const copiedChuckPositions = JSON.parse(JSON.stringify(chuckPositions));
      const addPosition = copiedChuckPositions[copiedChuckPositions.length - 2];

      addPosition[0] += 2;

      setChuckPositions([...chuckPositions, addPosition]);
    }
  };

  const handleClickDec = () => {
    if (chuckPositions.length <= 2) {
      alert("최소 개수는 2개입니다.");
      return;
    } else {
      const copiedChuckPositions = [...chuckPositions];

      copiedChuckPositions.pop();

      setChuckPositions(copiedChuckPositions);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="grow text-center font-bold text-lg">Turn!</p>
          <Button className="h-10 p-1">Left</Button>
          <Button clickHandler={handleClickRotateRight} className="h-10 p-1">
            Right
          </Button>
        </div>
        <div className="w-[80%] flex gap-3 items-center">
          <div className="grow font-bold text-lg">length?</div>
          <div className="font-semibold">{chuckPositions.length}</div>
          <div className="flex gap-2">
            <Button
              clickHandler={handleClickAdd}
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              + 1
            </Button>
            <Button
              clickHandler={handleClickDec}
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              - 1
            </Button>
          </div>
        </div>
        <Button clickHandler={handleClickReset} className="w-[90%] p-2">
          Reset!
        </Button>
        <Button className="w-[90%] p-2">Go Back!</Button>
      </div>
      {isOpenedReset && <ResetModal setIsOpened={setIsOpenedReset} />}
    </>
  );
};

export default SimulController;
