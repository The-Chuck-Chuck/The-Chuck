import { useState } from "react";
import { Link } from "react-router-dom";
import shareImage from "../asset/download-square-icon.svg";
import DownloadImageModal from "../pages/Modal/DownloadImageModal";
import Button from "./Button";
import useChuckStore from "../store/chuckStore";

const Header = ({ isTutorial, isCompletedTutorial, canvasRef }) => {
  const { setIsClickSkip } = useChuckStore();
  const [isOpenDownloadImg, setIsOpenDownloadImg] = useState(false);

  const handleClickShare = () => {
    setIsOpenDownloadImg(true);
  };

  const handleClickSkip = () => {
    setIsClickSkip(true);
  };

  return (
    <>
      {isOpenDownloadImg && (
        <DownloadImageModal
          canvasRef={canvasRef}
          isOpenDownloadImg={isOpenDownloadImg}
          setIsOpenDownloadImg={setIsOpenDownloadImg}
        />
      )}
      <header className="p-4 flex justify-between">
        <Link
          to="/"
          className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
        >
          Chuck-Chuck! Simulator
        </Link>
        {!isTutorial && (
          <button className="p-1" onClick={handleClickShare}>
            <img className="w-8" src={shareImage} alt="share link" />
          </button>
        )}
        {isTutorial && (
          <Button className="p-2 text-lg mb-3" clickHandler={handleClickSkip}>
            Skip
          </Button>
        )}
      </header>
      {isCompletedTutorial && (
        <span className="m-10 text-xl">튜토리얼이 모두 끝났습니다!</span>
      )}
    </>
  );
};

export default Header;
