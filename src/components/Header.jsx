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
          className="border-4 rounded-lg font-bold text-2xl w-40 flex justify-center items-center hover:text-black hover:bg-white"
        >
          시작 화면
        </Link>
        {!isTutorial && (
          <button className="p-1" onClick={handleClickShare}>
            <img className="w-8" src={shareImage} alt="share link" />
          </button>
        )}
        {isCompletedTutorial && (
          <div className="flex flex-col justify-center items-center">
            <span className="mt-5 text-xl">튜토리얼이 모두 끝났습니다!</span>
            <span className="text-xl">시작 화면으로 돌아간 후 척척이를 만들어 보세요!</span>
          </div>
        )}
        {isTutorial && (
          <Button className="p-2 text-lg mb-3" clickHandler={handleClickSkip}>
            건너뛰기
          </Button>
        )}
      </header>
    </>
  );
};

export default Header;
