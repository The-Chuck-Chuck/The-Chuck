import tempChukImage from "../asset/chuckmodel.jpeg";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-[10px]">
      <p className="text-[50px] font-bold">The Chuk Chuk</p>
      <div>
        <img className="mt-5 w-[300px]" src={tempChukImage} alt="chukimage" />
      </div>
      <button
        type="button"
        className="mt-10 w-[200px] text-[25px] bg-gray-500 rounded-full hover:bg-gray-700 p-2"
      >
        Start
      </button>
      <button
        type="button"
        className="w-[200px] text-[25px] bg-gray-500 rounded-full hover:bg-gray-700 p-2"
      >
        Tutorial!
      </button>
    </div>
  );
};

export default Home;
