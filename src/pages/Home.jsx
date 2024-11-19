import { useNavigate } from "react-router-dom";
import tempChuckImage from "../asset/chuckmodel.jpeg";
import Button from "../components/Button";
import usePageStore from "../store/pageStore";

const Home = () => {
  const setIsOpenedSimulatorModal = usePageStore(
    (state) => state.setIsOpenedSimulatorModal
  );
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate("/simulator");

    setIsOpenedSimulatorModal(true);
  };

  const handleClickTutorial = () => {
    navigate("/tutorial");

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
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[20px]">
      <p className="text-white text-[50px] font-bold">The Chuck-Chuck</p>
      <div>
        <img className="mt-5 w-[300px]" src={tempChuckImage} alt="chuckimage" />
      </div>
      <Button
        clickHandler={handleClickStart}
        className="w-[20%] text-[25px] p-2"
      >
        Start!
      </Button>
      <Button
        clickHandler={handleClickTutorial}
        className="w-[20%] text-[25px] p-2"
      >
        Tutorial!
      </Button>
    </div>
  );
};

export default Home;
