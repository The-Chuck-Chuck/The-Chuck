import useStore from "../store/pageStore";
import Button from "./Button";

const Modal = ({ drection, title, className, setIsOpened, children }) => {
  const setIsOpenedSimulatorModal = useStore(
    (state) => state.setIsOpenedSimulatorModal
  );
  const modalDrection = {
    horizontal: "w-[500px] h-[300px]",
    vertical: "w-[400px] h-[500px]",
  };

  const handleClickClose = () => {
    return setIsOpened ? setIsOpened(false) : setIsOpenedSimulatorModal(false);
  };

  return (
    <div className="fixed flex items-center w-[100%] h-[100vh] bg-black bg-opacity-25 z-20">
      <div
        className={`${modalDrection[drection]} ${className} fixed top-[30%] left-[30%] text-white flex flex-col bg-gray-700 rounded-xl border-gray-400 border-4 p-4 z-20`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <Button clickHandler={handleClickClose} className="border-2 w-8">
            X
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
