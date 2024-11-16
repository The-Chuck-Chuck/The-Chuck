import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";
import usePageStore from "../../store/pageStore";

const InitialSettingModal = () => {
  const setIsOpenedInitial = usePageStore((state) => state.setIsOpenedInitial);
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );

  const handleClickStartButton = () => {
    const initialPositionArray = [];
    const initialValue = 20;
    let positionX = 0;

    while (initialPositionArray.length < initialValue) {
      const positionY = initialPositionArray.length % 2 === 0 ? 0 : 2.5;
      const positionArray = [positionX, positionY, 0];
      initialPositionArray.push(positionArray);
      positionX += 2.5;
    }

    setIsOpenedInitial(false);
    setChuckPositionsList(initialPositionArray);
  };

  return (
    <Modal drection="horizontal" modalTitle="Initial Setting">
      <form className="mt-[15%] flex flex-col gap-5 justify-center items-center">
        <div className="font-bold text-lg">
          원하는 삼각기둥을 클릭 후 회전시켜 보세요!
        </div>
        <Button
          clickHandler={handleClickStartButton}
          className="w-[80%] mt-[10%] text-lg pl-7 pr-7 pt-2 pb-2"
        >
          Start Simulation
        </Button>
      </form>
    </Modal>
  );
};

export default InitialSettingModal;
