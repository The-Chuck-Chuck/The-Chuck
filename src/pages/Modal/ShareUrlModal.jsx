import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ShareUrlModal = ({ canvasRef, isOpenedShare, setIsOpenedShare }) => {
  const [isDownload, setIsDownload] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const linkRef = useRef();
  const { gl, scene, camera } = canvasRef.current;

  useEffect(() => {
    gl.render(scene, camera);
    gl.setClearColor("#2d3134", 1);

    gl.domElement.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        setImagePreviewUrl(url);
      },
      "image/png",
      0.8
    );
  }, []);

  const handleClickCopy = async () => {
    const link = linkRef.current;

    link.href = imagePreviewUrl;
    link.download = "chuck-chuck.png";
    link.click();

    setIsDownload(true);
  };

  useEffect(() => {
    if (!isOpenedShare) {
      setIsDownload(false);

      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [isOpenedShare]);

  return (
    <Modal
      drection="vertical"
      title="Share Your Chuck-chuck!"
      setIsOpened={setIsOpenedShare}
    >
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-6">
        <p className="text-lg font-semibold">
          아래 버튼을 눌러 이미지를 다운받으세요!
        </p>
        <div className="flex flex-col gap-5 justify-center items-center">
          <img className="w-72" src={imagePreviewUrl} />
          <Button
            clickHandler={handleClickCopy}
            className={`${isDownload && "bg-green-400 border-white text-white"} h-11 w-72 pl-2 pr-2`}
            disabled={isDownload && true}
          >
            {isDownload ? "Done! ✅" : "Download!"}
          </Button>
          <a ref={linkRef} className="hidden" />
        </div>
      </div>
    </Modal>
  );
};

export default ShareUrlModal;
