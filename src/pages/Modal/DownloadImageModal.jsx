import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

const DownloadImageModal = ({
  canvasRef,
  isOpenDownloadImg,
  setIsOpenDownloadImg,
}) => {
  const [isDownload, setIsDownload] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const linkRef = useRef();
  const { gl, scene, camera } = canvasRef.current;

  useEffect(() => {
    gl.render(scene, camera);

    gl.domElement.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        setImagePreviewUrl(url);
      },
      "image/png",
      0.8
    );
  }, []);

  const handleClickCopy = () => {
    const link = linkRef.current;

    link.href = imagePreviewUrl;
    link.download = "chuck-chuck.png";
    link.click();

    setIsDownload(true);
  };

  useEffect(() => {
    if (!isOpenDownloadImg) {
      setIsDownload(false);

      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
  }, [isOpenDownloadImg]);

  return (
    <Modal drection="vertical" setIsOpened={setIsOpenDownloadImg}>
      <div className="w-[100%] h-[100%] flex flex-col items-center gap-5">
        <p className="text-2xl font-bold">이미지를 다운받아 공유하세요!</p>
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-5">
            <p className="font-medium">아래의 이미지가 저장됩니다.</p>
            <img
              className="w-80 border-solid border-[#9d9d9d] border-2 rounded-md"
              src={imagePreviewUrl}
            />
          </div>
          <Button
            clickHandler={handleClickCopy}
            className={`${isDownload && "bg-green-400 border-white text-white"} h-12 w-50 pl-2 pr-2`}
            disabled={isDownload && true}
          >
            {isDownload ? "다운로드 완료 ✅" : "다운로드"}
          </Button>
          <a ref={linkRef} className="hidden" />
        </div>
      </div>
    </Modal>
  );
};

export default DownloadImageModal;
