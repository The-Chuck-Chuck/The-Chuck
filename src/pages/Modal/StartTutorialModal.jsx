import * as THREE from "three";
import tempChuckImage from "../../asset/chuckChuckModel.png";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";
import usePageStore from "../../store/pageStore";

const StartTutorialModal = () => {
  const setIsOpenedTutorialModal = usePageStore(
    (state) => state.setIsOpenedTutorialModal
  );
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );

  const handleClickStartTutorial = () => {
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

    setChuckPositionsList(initialStateArray);
    setIsOpenedTutorialModal(false);
  };

  return (
    <Modal
      drection="vertical"
      title="Start Tutorial"
      setIsOpened={setIsOpenedTutorialModal}
      className="top-[15%] left-[35%]"
    >
      <div className="flex w-[90%] h-[100vh] flex-col justify-center items-center ml-2 gap-3">
        <h2 className="text-center text-2xl font-bold">강아지 만들기</h2>
        <img className="m-7 w-24" src={tempChuckImage} alt="chuckimage" />
        <div className="w-64 text-center text-md">
          하이라이트 된 도형을 선택하고, 버튼을 클릭하세요! 순서를 따라가면
          강아지를 만들 수 있어요!
        </div>
      </div>
      <Button clickHandler={handleClickStartTutorial} className="p-2 text-md">
        Start Tutorial!
      </Button>
    </Modal>
  );
};

export default StartTutorialModal;
