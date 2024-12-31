import * as CONSTANTS from "../constants/constants";
import Button from "./Button";
import left from "../asset/left-rotate.svg";
import right from "../asset/right-rotate.svg";

const TutorialController = ({
  essentialClickButton,
  isCompletedIndex,
  isCompletedButton,
  setRotationAngle,
  setIsCompletedButton,
}) => {
  const handleClickLeft = () => {
    if (!isCompletedButton) {
      setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
      setIsCompletedButton(true);
    }
  };

  const handleClickRight = () => {
    if (!isCompletedButton) {
      setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
      setIsCompletedButton(true);
    }
  };

  return (
    <div className="flex flex-col gap-4 fixed bottom-4 right-4 w-[250px] rounded-md bg-slate-600 p-5 justify-center items-center">
      <div className="w-[90%] flex gap-2 items-center">
        <p className="pl-[2%] pr-[15%] text-center font-bold text-lg">회전</p>
        <button onClick={handleClickLeft} className="h-10 p-1 pr-[10%]">
          <img
            src={left}
            className={`h-full ${
              !isCompletedIndex || essentialClickButton === "right"
                ? "opacity-30"
                : "opacity-100 hover:opacity-75"
            }`}
          />
        </button>
        <button onClick={handleClickRight} className="h-10 p-1">
          <img
            src={right}
            className={`h-full ${
              !isCompletedIndex || essentialClickButton === "left"
                ? "opacity-30"
                : "opacity-100 hover:opacity-75"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default TutorialController;
