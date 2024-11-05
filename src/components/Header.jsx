import { Link } from "react-router-dom";
import saveIcon from "../asset/save-icon-silhouette-svgrepo-com.svg";
import searchIcon from "../asset/search-2907.svg";
import Button from "./Button";

const Header = () => {
  return (
    <div className="p-3 flex gap-7 items-center">
      <button type="button" className="grow">
        <img
          src={saveIcon}
          alt="save"
          className="w-8 h-8 hover:w-9 hover:h-9"
        />
      </button>
      <Link to="/" className="grow font-bold text-xl">
        <h1>Chuck-Chuck! Simulator</h1>
      </Link>
      <Button addClassName="p-1">Login!</Button>
      <button type="button" className="bg-saveIcon">
        <img
          src={searchIcon}
          alt="search"
          className="w-8 h-8 hover:w-9 hover:h-9"
        />
      </button>
    </div>
  );
};

export default Header;
