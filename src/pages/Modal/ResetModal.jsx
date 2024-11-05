import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ResetModal = ({ setIsOpened }) => {
  const handleCancel = () => {
    setIsOpened(false);
  };

  return (
    <Modal
      drection="row"
      title="초기화하시겠습니까?"
      addClassName="top-[20%] left-[20%]"
      setIsOpened={setIsOpened}
    >
      <div className="mt-8 flex flex-col gap-3 justify-center items-center">
        <Button addClassName="w-[80%] border-red-500 hover:bg-red-400 text-lg pl-7 pr-7 pt-2 pb-2">
          초기화하기
        </Button>
        <Button
          addClassName="w-[80%] text-lg pl-7 pr-7 pt-2 pb-2"
          handler={handleCancel}
        >
          취소하기
        </Button>
      </div>
    </Modal>
  );
};

export default ResetModal;
