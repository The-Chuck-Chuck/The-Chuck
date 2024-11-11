import { useState } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants";
import ResetModal from "../pages/Modal/ResetModal";
import useChuckStore from "../store/chuckStore";
import Button from "./Button";

const SimulController = ({
  groupRef,
  selectGroupRef,
  clickedChuckInfo,
  setRotationAngle,
  selectRotateChuck,
  setSelectRotateChuck,
}) => {
  const { chuckPositionsList, setChuckPositionsList } = useChuckStore();
  const [isOpenedReset, setIsOpenedReset] = useState(false);

  const handleClickLeft = () => {
    let selectedIndex = 0;

    if (
      clickedChuckInfo.userData &&
      groupRef.current &&
      selectGroupRef.current
    ) {
      groupRef.current.children.forEach((mesh, index) => {
        if (mesh.uuid === clickedChuckInfo.uuid) {
          selectedIndex = index;
        }
      });

      if (selectRotateChuck === null) {
        setSelectRotateChuck("left");

        groupRef.current.children.slice(0, selectedIndex).forEach((mesh) => {
          groupRef.current.remove(mesh);
          selectGroupRef.current.add(mesh);
        });

        groupRef.current.add(selectGroupRef.current);
      } else {
        setRotationAngle((prevAngle) => prevAngle - 90 * CONSTANTS.DEGREE);
      }
    } else {
      alert("회전할 도형을 클릭해주세요");
    }
  };

  const handleClickRight = () => {
    let selectedIndex = 0;

    groupRef.current.children.forEach((mesh, index) => {
      if (mesh.uuid === clickedChuckInfo.uuid) {
        selectedIndex = index;
      }
    });

    if (clickedChuckInfo.userData) {
      if (selectRotateChuck === null) {
        setSelectRotateChuck("right");

        groupRef.current.children
          .slice(selectedIndex)
          .forEach((mesh, index) => {
            if (index !== 0) {
              groupRef.current.remove(mesh);
              selectGroupRef.current.add(mesh);
            }
          });

        groupRef.current.add(selectGroupRef.current);
      } else {
        setRotationAngle((prevAngle) => prevAngle + 90 * CONSTANTS.DEGREE);
      }
    } else {
      alert("회전할 도형을 클릭해주세요");
    }
  };

  const handleClickReset = () => {
    setIsOpenedReset(true);
  };

  const handleClickAdd = () => {
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

  const handleClickDelete = () => {
    if (chuckPositionsList.length <= 2) {
      alert("최소 개수는 2개입니다.");

      return;
    } else {
      const copiedChuckPositionsList = [...chuckPositionsList];

      copiedChuckPositionsList.pop();

      setChuckPositionsList(copiedChuckPositionsList);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 fixed bottom-2 right-2 w-[250px] h-[250px] bg-slate-600 p-3 justify-center items-center">
        <div className="w-[90%] flex gap-2 items-center">
          <p className="grow text-center font-bold text-lg">Turn!</p>
          <Button className="h-10 p-1" clickHandler={handleClickLeft}>
            Left
          </Button>
          <Button className="h-10 p-1" clickHandler={handleClickRight}>
            Right
          </Button>
        </div>
        <div className="w-[80%] flex gap-3 items-center">
          <div className="grow font-bold text-lg">length?</div>
          <div className="font-semibold">{chuckPositionsList.length}</div>
          <div className="flex gap-2">
            <Button
              clickHandler={handleClickAdd}
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              + 1
            </Button>
            <Button
              clickHandler={handleClickDelete}
              className="w-[38px] text-sm h-8 pl-1 pr-1"
            >
              - 1
            </Button>
          </div>
        </div>
        <Button clickHandler={handleClickReset} className="w-[90%] p-2">
          Reset!
        </Button>
        <Button className="w-[90%] p-2">Go Back!</Button>
      </div>
      {isOpenedReset && <ResetModal setIsOpened={setIsOpenedReset} />}
    </>
  );
};

export default SimulController;
