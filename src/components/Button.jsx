const Button = ({ children, disabled = false, clickHandler, className }) => {
  return (
    <button
      onClick={clickHandler}
      className={`font-bold rounded-md border-4 ${className} ${disabled ? "text-gray-400 border-gray-400" : "text-white hover:bg-white hover:text-black"}`}
      disabled={disabled && disabled}
    >
      {children}
    </button>
  );
};

export default Button;
