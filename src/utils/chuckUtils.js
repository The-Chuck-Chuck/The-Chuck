import * as THREE from "three";

const makeCustomAxis = (index) => {
  const positionY = index % 2 === 0 ? 2.5 : -2.5;

  return new THREE.Vector3(2.5, positionY, 0).normalize();
};

export { makeCustomAxis };
