const Button = ({ isSubmit = false, children, clickHandler, className }) => {
  return (
    <button
      type={isSubmit === false ? "button" : "submit"}
      onClick={clickHandler}
      className={`text-white border-4 font-bold hover:bg-white hover:text-black rounded-md ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
