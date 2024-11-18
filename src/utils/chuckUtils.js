import * as THREE from "three";

const makeCustomAxis = (targetInfo, nextTargetInfo) => {
  const positionX = -(targetInfo.x - nextTargetInfo[0]);
  const positionY = -(targetInfo.y - nextTargetInfo[1]);
  const positionZ = -(targetInfo.z - nextTargetInfo[2]);

  return new THREE.Vector3(positionX, positionY, positionZ).normalize();
};

const updateChuckData = (groupRef) => {
  return Array.from(groupRef).map((mesh) => {
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
