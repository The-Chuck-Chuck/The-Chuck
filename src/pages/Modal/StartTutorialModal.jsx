import * as THREE from "three";
import highlightChuckGif from "../../asset/highlight-chuck.gif";
import clickButtonDirection from "../../asset/clickButtonDirection.png";
import chuckChuckModel from "../../asset/chuckChuckModel.png";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import useChuckStore from "../../store/chuckStore";
import usePageStore from "../../store/pageStore";
import { useState } from "react";

const StartTutorialModal = () => {
  const setIsOpenedTutorialModal = usePageStore(
    (state) => state.setIsOpenedTutorialModal
  );
  const setChuckPositionsList = useChuckStore(
    (state) => state.setChuckPositionsList
  );
  const [pageCount, setPageCount] = useState(0);

  const handleClickNextPage = () => {
    setPageCount(pageCount + 1);
  };
  const handleClicPrevPage = () => {
    setPageCount(pageCount - 1);
  };

  const handleClickStartTutorial = () => {
    const initialValue = 24;
    let positionX = -30;

    const initialStateArray = Array.from(
      { length: initialValue },
      (_, index) => {
        const positionY = index % 2 === 0 ? 0 : 2.6;
        const position = [positionX, positionY, 0];
        const quaternion = new THREE.Quaternion(0, 0, 0, 1).toArray();
        positionX += 2.6;

        return { position, quaternion };
      }
    );

    setChuckPositionsList(initialStateArray);
    setIsOpenedTutorialModal(false);
    setPageCount(0);
  };

  return (
    <Modal drection="vertical">
      <div className="flex h-[100%] flex-col items-center gap-3">
        <h2 className="text-center text-3xl font-semibold mb-3">
          Start Tuorial!
        </h2>
        {pageCount === 0 && (
          <>
            <img
              className="m-2 w-56"
              src={highlightChuckGif}
              alt="highlight chuck gif"
            />
            <p className="w-64 text-center text-lg">
              <span className="font-bold">반짝이는 도형</span>을 클릭하세요!{" "}
              <br />
              우린 이 도형까지 회전시킬 거예요.
            </p>
          </>
        )}
        {pageCount === 1 && (
          <>
            <img
              className="mt-7 mb-2 w-64"
              src={clickButtonDirection}
              alt="click Button Direction"
            />
            <p className="w-72 text-center text-lg">
              그 다음 <span className="font-bold">켜진 방향 버튼</span>을 클릭해
              주세요.
            </p>
            <p className="w-72 text-center text-lg">
              선택한 방향으로 척척이가 회전합니다!
            </p>
            <p className="w-72 text-center text-lg">
              이제 다음 도형을 클릭할 수 있습니다!
            </p>
          </>
        )}
        {pageCount === 2 && (
          <div className="flex flex-col h-[100%] justify-center items-center gap-5">
            <img
              className="m-2 w-48"
              src={chuckChuckModel}
              alt="chuckChuck Model"
            />
            <p className="w-80 text-center text-md">
              순서대로 따라가면 강아지를 만들 수 있습니다.
            </p>
            <p className="w-64 text-center text-lg font-semibold">
              이제 튜토리얼을 시작해 보세요!
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-4 w-[100%]">
        <Button
          clickHandler={handleClicPrevPage}
          className="w-[50%] p-2 text-md mb-3"
        >
          Prev Page
        </Button>
        <Button
          clickHandler={
            pageCount !== 2 ? handleClickNextPage : handleClickStartTutorial
          }
          className="w-[50%] p-2 text-md mb-3"
        >
          {pageCount !== 2 ? "Next Page" : "Start Tutorial!"}
        </Button>
      </div>
    </Modal>
  );
};

export default StartTutorialModal;
