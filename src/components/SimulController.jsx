import { useState } from "react";
import ResetModal from "../pages/Modal/ResetModal";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";

const SimulController = () => {
  const chuckLength = useChuckStore((state) => state.chuckLength);
  const [isOpenedReset, setIsOpenedReset] = useState(false);

  const handleClickReset = () => {
    setIsOpenedReset(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="grow text-center font-bold text-lg">Turn!</p>
          <Button addClassName="h-10 p-1">Left</Button>
          <Button addClassName="h-10 p-1">Right</Button>
        </div>
        <div className="w-[80%] flex gap-3 items-center">
          <div className="grow font-bold text-lg">length?</div>
          <div className="font-semibold">{chuckLength}</div>
          <div className="flex gap-2">
            <Button addClassName="w-[38px] text-sm h-8 pl-1 pr-1">+ 1</Button>
            <Button addClassName="w-[38px] text-sm h-8 pl-1 pr-1">- 1</Button>
          </div>
        </div>
        <Button handler={handleClickReset} addClassName="w-[90%] p-2">
          Reset!
        </Button>
        <Button addClassName="w-[90%] p-2">Go Back!</Button>
      </div>
      {isOpenedReset && <ResetModal setIsOpened={setIsOpenedReset} />}
    </>
  );
};

export default SimulController;
