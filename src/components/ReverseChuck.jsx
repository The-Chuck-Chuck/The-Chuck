import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants";

const ReverseChuck = ({ position, color, rotationAngle, name }) => {
  const chuckRef = useRef();
  const currentRotationAngle = useRef(0);
  const customAxis = new THREE.Vector3(1, CONSTANTS.YVERTEX / 3, 0).normalize();
  // prettier-ignore
  const vertexArray = new Float32Array([
    1, CONSTANTS.YVERTEX, -1,
    3, CONSTANTS.YVERTEX, -1,
    2, 0, -1,
    1, CONSTANTS.YVERTEX, 1,
    3, CONSTANTS.YVERTEX, 1,
    2, 0, 1,
  ]);
  // prettier-ignore
  const shapeFace = [
    0, 1, 2,
    3, 4, 5,
    0, 2, 3,
    2, 3, 5,
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
  customGeometry.computeBoundingBox();
  customGeometry.computeBoundingSphere();

  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  useFrame(() => {
    if (currentRotationAngle !== rotationAngle) {
      currentRotationAngle.current = THREE.MathUtils.lerp(
        currentRotationAngle.current,
        rotationAngle,
        0.02
      );

      const customRotation = new THREE.Quaternion();

      customRotation.setFromAxisAngle(customAxis, currentRotationAngle.current);
      chuckRef.current.quaternion.copy(customRotation);
    }
  });

  return (
    <>
      <mesh
        ref={chuckRef}
        geometry={customGeometry}
        position={position}
        userData={{ position, name }}
      >
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        <lineSegments geometry={shapeFaceEdgeLine}>
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
    </>
  );
};

export default ReverseChuck;
