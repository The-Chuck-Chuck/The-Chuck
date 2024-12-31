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
    <Modal drection="horizontal">
      <h2 className="text-center text-3xl font-semibold mb-2">
        안내 문구를 확인해 주세요
      </h2>
      <div className="mt-[10%] mb-5 flex flex-col justify-center items-center">
        <p className="font-semibold text-lg">
          회전시키고 싶은 도형을 클릭 후 버튼을 눌러 척척이를 돌려요!
        </p>
        <p className="font-semibold text-lg">
          우클릭을 사용해 화면을 원하는 위치로 변경할 수 있어요!
        </p>
        <Button
          clickHandler={handleClickStartButton}
          className="w-[50%] mt-[10%] text-lg pl-7 pr-7 pt-2 pb-2"
        >
          시작 하기
        </Button>
      </div>
    </Modal>
  );
};

export default StartSimulatorModal;
