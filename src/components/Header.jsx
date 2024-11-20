import { Link } from "react-router-dom";
import Button from "./Button";

const Header = ({ iscameraMode, setIsCameraMode }) => {
  const setCameraMode = () => {
    if (iscameraMode) {
      setIsCameraMode(false);
    } else {
      setIsCameraMode(true);
    }
  };

  return (
    <header className="p-4">
      <Link
        to="/"
        className="border-4 rounded-lg font-bold text-2xl w-80 flex justify-center items-center"
      >
        Chuck-Chuck! Simulator
      </Link>
      <Button
        className={`${iscameraMode && "bg-gray-100 text-black"} fixed right-4 top-4 border-1 rounded-lg font-semibold w-60 text-md flex justify-center items-center`}
        clickHandler={setCameraMode}
      >
        {`${iscameraMode ? "Tracking Camera View" : "Normal Camera View"}`}
      </Button>
    </header>
  );
};

export default Header;
