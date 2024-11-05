import { useNavigate } from "react-router-dom";
import tempChuckImage from "../asset/chuckmodel.jpeg";
import Button from "../components/Button";
import useStore from "../store/pageStore";

const Home = () => {
  const setIsOpenedModal = useStore((state) => state.setIsOpenedModal);
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate("/simulator");
    setIsOpenedModal(true);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[20px]">
      <p className="text-white text-[50px] font-bold">The Chuck-Chuck</p>
      <div>
        <img className="mt-5 w-[300px]" src={tempChuckImage} alt="chuckimage" />
      </div>
      <Button handler={handleClickStart} addClassName="w-[20%] text-[25px] p-2">
        Start!
      </Button>
      <Button addClassName="w-[20%] text-[25px] p-2">Tutorial!</Button>
    </div>
  );
};

export default Home;
