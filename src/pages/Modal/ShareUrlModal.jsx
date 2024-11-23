import { useRef } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ShareUrlModal = ({ setIsOpenedShare }) => {
  const dataLinkRef = useRef();

  const handleClickCopy = () => {
    console.dir(dataLinkRef.current.value);
  };

  return (
    <Modal
      drection="horizontal"
      title="Share Your Chuck-chuck!"
      setIsOpened={setIsOpenedShare}
    >
      <div className="flex gap-3 justify-center items-center w-[100%] h-[100%]">
        <input
          type="text"
          ref={dataLinkRef}
          value="멍청이"
          className="text-white w-80 h-11 p-2 bg-gray-500 rounded-md justify-center"
          disabled="true"
        />
        <Button clickHandler={handleClickCopy} className="h-11 pl-2 pr-2">
          Copy!
        </Button>
      </div>
    </Modal>
  );
};

export default ShareUrlModal;
