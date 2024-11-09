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

const handleClickChuck = (
  event,
  gl,
  camera,
  scene,
  raycastingRef,
  setClickedChuckInfo,
  setSelectRotateChuck
) => {
  event.stopPropagation();

  const syncCordinater = new THREE.Vector2(
    (event.offsetX / gl.domElement.clientWidth) * 2 - 1,
    -(event.offsetY / gl.domElement.clientHeight) * 2 + 1
  );

  raycastingRef.current.setFromCamera(syncCordinater, camera);
  raycastingRef.current.precision = 0.000001;

  let intersects = raycastingRef.current.intersectObjects(scene.children, true);

  intersects = intersects.filter((intersect) => intersect.object.isMesh);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const { position, name } = clickedObject.userData;

    setClickedChuckInfo({
      position: position,
      name: name,
    });
    setSelectRotateChuck(null);
  }
};

export { findLeftRightPosition, makeCustomAxis, handleClickChuck };
