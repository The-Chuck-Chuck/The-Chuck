import * as CONSTANTS from "../constants/constants";
import Button from "./Button";

const TutorialController = ({
  orderButton,
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
        <p className="pl-[2%] pr-[15%] text-center font-bold text-lg">Turn!</p>
        <Button
          className="h-10 p-1"
          clickHandler={handleClickLeft}
          disabled={
            (!isCompletedIndex || orderButton === "right") && "disabled"
          }
        >
          Left
        </Button>
        <Button
          className="h-10 p-1"
          clickHandler={handleClickRight}
          disabled={(!isCompletedIndex || orderButton === "left") && "disabled"}
        >
          Right
        </Button>
      </div>
    </div>
  );
};

export default TutorialController;
