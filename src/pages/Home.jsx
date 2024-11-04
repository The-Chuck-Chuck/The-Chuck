import { useNavigate } from "react-router-dom";
import tempChcukImage from "../asset/chuckmodel.jpeg";
import Button from "../components/Button";

const Home = () => {
  const navigate = useNavigate();

  const handleClickStart = () => {
    navigate("/simulator");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[20px]">
      <p className="text-white text-[50px] font-bold">The Chcuk-Chcuk</p>
      <div>
        <img className="mt-5 w-[300px]" src={tempChcukImage} alt="chukimage" />
      </div>
      <Button handler={handleClickStart} addClassName="w-[20%] text-[25px] p-2">
        Start!
      </Button>
      <Button addClassName="w-[20%] text-[25px] p-2">Tutorial!</Button>
    </div>
  );
};

export default Home;
