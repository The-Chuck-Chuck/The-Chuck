import * as THREE from "three";
import * as CONSTANTS from "../constants/constants.js";

const Chuck = ({ position, color }) => {
  // prettier-ignore
  const vertexArray = new Float32Array([
    0, 0, 0,
    2, 0, 0,
    1, CONSTANTS.YVERTEX, 0,
    0, 0, 2,
    2, 0, 2,
    1, CONSTANTS.YVERTEX, 2,
  ]);
  // prettier-ignore
  const shapeFace = [
    0, 1, 2,
    0, 2, 5,
    0, 3, 5,
    3, 4, 5,
    1, 2, 5,
    1, 4, 5,
    0, 1, 3,
    1, 3, 4,
  ]
  const customGeometry = new THREE.BufferGeometry();

  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);

  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  return (
    <>
      <mesh geometry={customGeometry} position={position}>
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        <lineSegments geometry={shapeFaceEdgeLine}>
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
    </>
  );
};

export default Chuck;
