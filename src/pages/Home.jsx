import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tempChuckImage from "../asset/chuckChuckModel.png";
import Button from "../components/Button";
import useChuckStore from "../store/chuckStore";
import usePageStore from "../store/pageStore";

const Home = () => {
  const { setIsOpenedSimulatorModal, setIsOpenedTutorialModal } =
    usePageStore();
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );

  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate("/simulator");

    setIsOpenedSimulatorModal(true);
  };

  const handleClickTutorial = () => {
    navigate("/tutorial");

    setIsOpenedTutorialModal(true);
  };

  useEffect(() => {
    setChuckPositionsList([]);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[20px]">
      <p className="text-white text-[50px] font-bold">The Chuck-Chuck</p>
      <div>
        <img
          className="mt-5 mb-3 ml-3 w-[200px]"
          src={tempChuckImage}
          alt="chuckimage"
        />
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
