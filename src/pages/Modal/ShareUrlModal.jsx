import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const ShareUrlModal = ({
  canvasRef,
  isOpenDownladImg,
  setIsOpenDownladImg,
}) => {
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
    await link.click();

    setIsDownload(true);
  };

  useEffect(() => {
    if (!isOpenDownladImg) {
      setIsDownload(false);

      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [isOpenDownladImg]);

  return (
    <Modal
      drection="vertical"
      title="Share Your Chuck-chuck!"
      setIsOpened={setIsOpenDownladImg}
    >
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center gap-5">
        <p className="text-xl font-semibold">이미지를 다운받아 공유하세요!</p>
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-medium">아래의 사진이 저장됩니다.</p>
            <img className="w-72" src={imagePreviewUrl} />
          </div>
          <Button
            clickHandler={handleClickCopy}
            className={`${isDownload && "bg-green-400 border-white text-white"} h-12 w-72 pl-2 pr-2`}
            disabled={isDownload && true}
          >
            {isDownload ? "Save completed! ✅" : "Download Image!"}
          </Button>
          <a ref={linkRef} className="hidden" />
        </div>
      </div>
    </Modal>
  );
};

export default ShareUrlModal;
