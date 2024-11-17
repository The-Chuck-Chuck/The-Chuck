import * as THREE from "three";

const makeCustomAxis = (index) => {
  const positionY = index % 2 === 0 ? 2.5 : -2.5;

  return new THREE.Vector3(2.5, positionY, 0).normalize();
};

const updateChuckData = (ref) => {
  return Array.from(ref.current.children).map((mesh) => {
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();

    mesh.getWorldPosition(position);
    mesh.getWorldQuaternion(quaternion);

    return {
      position: [position.x, position.y, position.z],
      quaternion: [quaternion.x, quaternion.y, quaternion.z, quaternion.w],
    };
  });
};

export { makeCustomAxis, updateChuckData };
