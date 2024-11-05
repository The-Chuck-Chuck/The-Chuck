import Button from "./Button";

const Modal = ({ drection, title, children }) => {
  const modalDrection = {
    row: "w-[500px] h-[300px]",
    col: "w-[400px] h-[500px]",
  };

  return (
    <div
      className={`${modalDrection[drection]} text-white fixed flex flex-col bg-gray-700 rounded-xl border-gray-400 border-4 p-4`}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <Button addClassName="border-2 w-6">X</Button>
      </div>
      {children}
    </div>
  );
};

export default Modal;
