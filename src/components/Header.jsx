import { useState } from "react";
import { Link } from "react-router-dom";
import saveIcon from "../asset/save-icon-silhouette-svgrepo-com.svg";
import searchIcon from "../asset/search-2907.svg";
import LoginModal from "../pages/Modal/LoginModal";
import SaveModal from "../pages/Modal/SaveModal";
import Button from "./Button";

const Header = () => {
  const [isOpenedLogin, setIsOpenedLogin] = useState(false);
  const [isOpenedSave, setIsOpenedSave] = useState(false);

  const handleClickLogin = () => {
    setIsOpenedLogin(true);
  };

  const handleClickSave = () => {
    setIsOpenedSave(true);
  };

  return (
    <>
      {isOpenedLogin && <LoginModal setIsOpened={setIsOpenedLogin} />}
      {isOpenedSave && <SaveModal setIsOpened={setIsOpenedSave} />}
      <div className="p-3 flex gap-7 items-center">
        <button onClick={handleClickSave} type="button" className="grow">
          <img
            src={saveIcon}
            alt="save"
            className="w-8 h-8 hover:w-9 hover:h-9"
          />
        </button>
        <Link to="/" className="grow font-bold text-xl">
          <h1>Chuck-Chuck! Simulator</h1>
        </Link>
        <Button handler={handleClickLogin} addClassName="p-1">
          Login!
        </Button>
        <button type="button" className="bg-saveIcon">
          <img
            src={searchIcon}
            alt="search"
            className="w-8 h-8 hover:w-9 hover:h-9"
          />
        </button>
      </div>
    </>
  );
};

export default Header;
