import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-4">
      <Link
        to="/"
        className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
      >
        Chuck-Chuck! Simulator
      </Link>
    </header>
  );
};

export default Header;
