import Button from "./Button";

const SimulController = () => {
  return (
    <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
      <div className="w-[90%] flex gap-2 items-center">
        <p className="grow text-center font-bold text-lg">Turn!</p>
        <Button addClassName="h-10 p-1">Left</Button>
        <Button addClassName="h-10 p-1">Right</Button>
      </div>
      <div className="w-[80%] flex gap-3">
        <p className="grow font-bold text-lg">length?</p>
        <Button addClassName="w-[40px] h-8 pl-1 pr-1">+ 1</Button>
        <Button addClassName="w-[40px] h-8 pl-1 pr-1">- 1</Button>
      </div>
      <Button addClassName="w-[90%] p-2">Reset!</Button>
      <Button addClassName="w-[90%] p-2">Go Back!</Button>
    </div>
  );
};

export default SimulController;
