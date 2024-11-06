import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import usePageStore from "../../store/pageStore";

const InitialSettingModal = () => {
  const setIsOpenedInitial = usePageStore((state) => state.setIsOpenedInitial);
  const [inputValue, setInputValue] = useState(25);

  const handleChangedValue = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setIsOpenedInitial(false);
  };

  return (
    <Modal drection="horizontal" title="Initial Setting">
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
