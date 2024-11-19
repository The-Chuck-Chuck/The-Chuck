import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";
import usePageStore from "../../store/pageStore";
import * as THREE from "three";

const StartSimulatorModal = () => {
  const setIsOpenedSimulatorModal = usePageStore(
    (state) => state.setIsOpenedSimulatorModal
  );
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );

  const handleClickStartButton = () => {
    const initialValue = 24;
    let positionX = -30;

    const initialStateArray = Array.from(
      { length: initialValue },
      (_, index) => {
        const positionY = index % 2 === 0 ? 0 : 2.6;
        const position = [positionX, positionY, 0];
        const quaternion = new THREE.Quaternion(0, 0, 0, 1).toArray();
        positionX += 2.6;

        return { position, quaternion };
      }
    );

    setIsOpenedSimulatorModal(false);
    setChuckPositionsList(initialStateArray);
  };

  return (
    <Modal drection="horizontal" title="Initial Setting">
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

export default StartSimulatorModal;
