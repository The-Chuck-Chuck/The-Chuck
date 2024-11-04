const Button = ({ buttonOrSubmit, children, handler, addClassName }) => {
  return (
    <button
      type={buttonOrSubmit === undefined ? "button" : "submit"}
      onClick={handler}
      className={`text-white border-4 font-bold hover:bg-white hover:text-black rounded-md ${addClassName}`}
    >
      {children}
    </button>
  );
};

export default Button;
