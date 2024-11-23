import { Link } from "react-router-dom";
import shareImage from "../asset/share-svgrepo-com.svg";
import ShareUrlModal from "../pages/Modal/ShareUrlModal";
import { useState } from "react";

const Header = () => {
  const [isOpenedShare, setIsOpenedShare] = useState(false);

  const handleClickShare = () => {
    setIsOpenedShare(true);
  };

  return (
    <>
      {isOpenedShare && <ShareUrlModal setIsOpenedShare={setIsOpenedShare} />}
      <header className="p-4 flex justify-between">
        <Link
          to="/"
          className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
        >
          Chuck-Chuck! Simulator
        </Link>
        <button className="p-1" onClick={handleClickShare}>
          <img className="w-8" src={shareImage} alt="share link" />
        </button>
      </header>
    </>
  );
};

export default Header;
