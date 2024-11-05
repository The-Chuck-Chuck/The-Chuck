import useStore from "../store/pageStore";
import Button from "./Button";

const Modal = ({ drection, setIsOpened, title, addClassName, children }) => {
  const setIsOpenedInitial = useStore((state) => state.setIsOpenedInitial);
  const modalDrection = {
    row: "w-[500px] h-[300px]",
    col: "w-[400px] h-[500px]",
  };

  const handleClickClose = () => {
    return setIsOpened ? setIsOpened(false) : setIsOpenedInitial(false);
  };

  return (
    <div
      className={`${modalDrection[drection]} ${addClassName} fixed text-white flex flex-col bg-gray-700 rounded-xl border-gray-400 border-4 p-4 z-10`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button handler={handleClickClose} addClassName="border-2 w-8">
          X
        </Button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
