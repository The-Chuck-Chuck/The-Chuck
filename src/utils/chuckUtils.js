import * as THREE from "three";

const findLeftRightPosition = (
  everyChuckPosition,
  mouseClickInfo,
  btnClickInfo
) => {
  let targetPosition = null;

  everyChuckPosition.forEach((value, index) => {
    if (JSON.stringify(value) === JSON.stringify(mouseClickInfo.position)) {
      if (btnClickInfo === "left") {
        targetPosition = everyChuckPosition[index - 1] || null;
      } else {
        targetPosition = everyChuckPosition[index + 1] || null;
      }
    }
  });

  return targetPosition;
};

const makeCustomAxis = (mouseClickInfo, btnClickInfo) => {
  const positionX = mouseClickInfo.position[1] === 0 ? -2.5 : 2.5;
  const positionY = btnClickInfo === "left" ? 2.5 : -2.5;

  return new THREE.Vector3(positionX, positionY, 0).normalize();
};

export { findLeftRightPosition, makeCustomAxis };
