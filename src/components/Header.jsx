import { Link } from "react-router-dom";
import saveIcon from "../asset/save-icon-silhouette-svgrepo-com.svg";
import searchIcon from "../asset/search-2907.svg";

const Header = () => {
  return (
    <div className="h-24 p-6 flex gap-7 items-center">
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
      <button
        type="button"
        className="w-16 h-10 border-2 rounded-lg border-white p-1 hover:border-4"
      >
        Login!
      </button>
      <button type="button">
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
