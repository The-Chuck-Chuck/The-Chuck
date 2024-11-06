import { useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const SaveModal = ({ setIsOpened }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChangedValue = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <Modal drection="horizontal" title="Save" setIsOpened={setIsOpened}>
      <form
        action="submit"
        className="mt-8 flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="text"
          name="saveTitle"
          className="w-[80%] h-10 text-black rounded-md"
          value={inputValue}
          onChange={handleChangedValue}
        />
        {!inputValue && (
          <div className="text-red-500">제목이 필수로 입력되어야 합니다.</div>
        )}
        <Button className="w-[80%] h-10">save</Button>
      </form>
    </Modal>
  );
};
export default SaveModal;
