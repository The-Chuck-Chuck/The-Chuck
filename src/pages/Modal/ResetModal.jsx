import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ResetModal = ({ setIsOpened }) => {
  const handleCancel = () => {
    setIsOpened(false);
  };

  return (
    <Modal
      drection="horizontal"
      modalTitle="초기화하시겠습니까?"
      className="top-[30%] left-[30%]"
      setIsOpened={setIsOpened}
    >
      <div className="mt-8 flex flex-col gap-3 justify-center items-center">
        <Button className="w-[80%] border-red-500 hover:bg-red-400 text-lg pl-7 pr-7 pt-2 pb-2">
          초기화하기
        </Button>
        <Button
          className="w-[80%] text-lg pl-7 pr-7 pt-2 pb-2"
          clickHandler={handleCancel}
        >
          취소하기
        </Button>
      </div>
    </Modal>
  );
};

export default ResetModal;
