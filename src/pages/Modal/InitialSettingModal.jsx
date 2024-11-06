import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";
import usePageStore from "../../store/pageStore";

const InitialSettingModal = () => {
  const setIsOpenedInitial = usePageStore((state) => state.setIsOpenedInitial);
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );
  const [inputValue, setInputValue] = useState(25);

  const handleChangedValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    const initialPositionArray = [];
    let positionCount = inputValue;
    let positionX = 0;

    while (positionCount > 0) {
      const positionArray = [positionX, 0, 0];

      for (let i = 0; i < 2; i++) {
        positionCount--;

        positionCount >= 0 && initialPositionArray.push(positionArray);
      }

      positionX += 2;
    }

    setIsOpenedInitial(false);
    setChuckPositionsList(initialPositionArray);
  };

  return (
    <Modal drection="horizontal" modalTitle="Initial Setting">
      <form className="mt-[5%] flex flex-col gap-5 justify-center items-center">
        <input
          type="range"
          name="initialInput"
          id="initialInput"
          min={2}
          max={50}
          value={inputValue}
          onChange={handleChangedValue}
          className="w-[80%] h-10 text-black rounded-md"
        />
        <div className="text-lg font-bold">{inputValue}</div>
        <Button
          clickHandler={handleClick}
          className="w-[80%] text-lg pl-7 pr-7 pt-2 pb-2"
        >
          Start Simulation
        </Button>
      </form>
    </Modal>
  );
};

export default InitialSettingModal;
