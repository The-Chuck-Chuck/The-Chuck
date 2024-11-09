import * as CONSTANTS from "../constants/constants";

const handleClickLeft = (
  clickedChuckInfo,
  selectRotateChuck,
  setSelectRotateChuck,
  setRotationAngle
) => {
  if (clickedChuckInfo.length !== 0) {
    if (selectRotateChuck === null) {
      setSelectRotateChuck("left");
    } else {
      setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
    }
  } else {
    alert("회전할 도형을 클릭해주세요");
  }
};

const handleClickRight = (
  clickedChuckInfo,
  selectRotateChuck,
  setSelectRotateChuck,
  setRotationAngle
) => {
  if (clickedChuckInfo.length !== 0) {
    if (selectRotateChuck === null) {
      setSelectRotateChuck("right");
    } else {
      setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
    }
  } else {
    alert("회전할 도형을 클릭해주세요");
  }
};

const handleClickReset = (setIsOpenedReset) => {
  setIsOpenedReset(true);
};

const handleClickAdd = (chuckPositionsList, setChuckPositionsList) => {
  if (chuckPositionsList.length >= 50) {
    alert("최대 개수는 50개입니다.");

    return;
  } else {
    const copiedChuckPositionsList = JSON.parse(
      JSON.stringify(chuckPositionsList)
    );
    const addPosition =
      copiedChuckPositionsList[copiedChuckPositionsList.length - 2];

    addPosition[0] += 5;

    setChuckPositionsList([...chuckPositionsList, addPosition]);
  }
};

const handleClickDelete = (chuckPositionsList, setChuckPositionsList) => {
  if (chuckPositionsList.length <= 2) {
    alert("최소 개수는 2개입니다.");

    return;
  } else {
    const copiedChuckPositionsList = [...chuckPositionsList];

    copiedChuckPositionsList.pop();

    setChuckPositionsList(copiedChuckPositionsList);
  }
};

export {
  handleClickAdd,
  handleClickDelete,
  handleClickLeft,
  handleClickRight,
  handleClickReset,
};
