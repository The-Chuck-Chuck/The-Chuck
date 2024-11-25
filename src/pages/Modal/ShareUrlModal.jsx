import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";

const ShareUrlModal = ({ isOpenedShare, setIsOpenedShare }) => {
  const { encodedPositionsData } = useChuckStore();
  const dataLinkRef = useRef();
  const [isCopied, setIsCopied] = useState(false);

  const handleClickCopy = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}/${encodedPositionsData}`;

    await navigator.clipboard
      .writeText(shareUrl)
      .then(() => setIsCopied(true))
      .catch(() => console.error("URL 복사 실패!"));
  };

  useEffect(() => {
    if (!isOpenedShare) {
      setIsCopied(false);
    }
  }, [isOpenedShare]);

  return (
    <Modal
      drection="horizontal"
      title="Share Your Chuck-chuck!"
      setIsOpened={setIsOpenedShare}
    >
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-6">
        <p className="text-lg font-semibold">
          아래 링크를 복사해 공유해 보세요!
        </p>
        <div className="flex gap-3 justify-center items-center">
          <input
            type="text"
            ref={dataLinkRef}
            value={`${window.location.origin}${window.location.pathname}/${encodedPositionsData}`}
            className="text-white w-80 h-11 p-2 bg-gray-500 rounded-md justify-center"
            disabled={true}
          />
          <Button
            clickHandler={handleClickCopy}
            className={`${isCopied && "bg-green-400 border-white text-white"} h-11 pl-2 pr-2`}
            disabled={isCopied && true}
          >
            {isCopied ? "copied! ✅" : "Copy Link!"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ShareUrlModal;
