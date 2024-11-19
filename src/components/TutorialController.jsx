import Button from "./Button";

const TutorialController = ({
  isDisable = true,
  rotationAngle,
  setRotationAngle,
}) => {
  const preventButton = isDisable && "text-gray-400 border-gray-400";

  const handleClickLeft = () => {
    setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
  };

  const handleClickRight = () => {
    setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
  };

  return (
    <div className="flex flex-col gap-4 fixed bottom-4 right-4 w-[250px] rounded-md bg-slate-600 p-5 justify-center items-center">
      <div className="w-[90%] flex gap-2 items-center">
        <p className="pl-[2%] pr-[15%] text-center font-bold text-lg">Turn!</p>
        <Button
          className={`${preventButton} h-10 p-1`}
          clickHandler={!isDisable ? handleClickLeft : undefined}
        >
          Left
        </Button>
        <Button
          className={`${preventButton} h-10 p-1`}
          clickHandler={!isDisable ? handleClickRight : undefined}
        >
          Right
        </Button>
      </div>
    </div>
  );
};

export default TutorialController;
