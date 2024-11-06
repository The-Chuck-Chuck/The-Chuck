import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants";

const Chuck = ({ position, color, rotationAngle }) => {
  const chuckRef = useRef();
  const currentRotatoinAngle = useRef(0);
  const customAxis = new THREE.Vector3(1, CONSTANTS.YVERTEX / 3, 0).normalize();
  // prettier-ignore
  const vertexArray = new Float32Array([
    0, 0, -1,
    2, 0, -1,
    1, CONSTANTS.YVERTEX, -1,
    0, 0, 1,
    2, 0, 1,
    1, CONSTANTS.YVERTEX, 1,
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
  customGeometry.computeBoundingBox();
  customGeometry.computeBoundingSphere();
  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  useFrame(() => {
    if (currentRotatoinAngle !== rotationAngle) {
      currentRotatoinAngle.current = THREE.MathUtils.lerp(
        currentRotatoinAngle.current,
        rotationAngle,
        0.02
      );
      const customRotation = new THREE.Quaternion();
      customRotation.setFromAxisAngle(customAxis, currentRotatoinAngle.current);
      chuckRef.current.quaternion.copy(customRotation);
    }
  });

  return (
    <>
      <mesh
        ref={chuckRef}
        geometry={customGeometry}
        position={position}
        userData={{ position, color }}
      >
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        <lineSegments geometry={shapeFaceEdgeLine}>
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
    </>
  );
};

export default Chuck;
