const SimulController = () => {
  return (
    <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
      <div className="flex gap-2 items-center">
        <p className="grow bg-slate-600 text-center font-bold text-lg">Turn!</p>
        <button className="h-10 border-2 hover:bg-white hover:text-black rounded-md p-1">
          Left
        </button>
        <button className="h-10 border-2 hover:bg-white hover:text-black rounded-md p-1">
          Right
        </button>
      </div>
      <div className="flex gap-3">
        <p className="font-bold text-lg">length?</p>
        <button className="h-8 border-2 hover:bg-white hover:text-black rounded-md p-1">
          + 1
        </button>
        <button className="h-8 border-2 hover:bg-white hover:text-black rounded-md p-1">
          - 1
        </button>
      </div>
      <button className="w-[90%] hover:bg-white hover:text-black font-bold border-4 p-2 rounded-md">
        Reset!
      </button>
      <button className="w-[90%] hover:bg-white hover:text-black font-bold border-4 p-2 rounded-md">
        Go Back!
      </button>
    </div>
  );
};

export default SimulController;
