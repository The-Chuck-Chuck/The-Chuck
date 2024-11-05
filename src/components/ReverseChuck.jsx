import { useEffect, useRef } from "react";
import * as THREE from "three";
import * as CONSTANTS from "../constants/constants.js";

const ReverseChuck = ({ position, color, rotationAngle }) => {
  const chuckRef = useRef();
  const pivotRef = useRef();
  const axisShow = useRef();
  // prettier-ignore
  const vertexArray = new Float32Array([
    1, CONSTANTS.YVERTEX, 0,
    3, CONSTANTS.YVERTEX, 0,
    2, 0, 0,
    1, CONSTANTS.YVERTEX, 2,
    3, CONSTANTS.YVERTEX, 2,
    2, 0, 2,
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

  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  useEffect(() => {
    if (chuckRef.current && pivotRef.current) {
      const customAxis = new THREE.Vector3(
        1,
        CONSTANTS.YVERTEX / 3,
        0
      ).normalize();
      const customRotation = new THREE.Quaternion().setFromAxisAngle(
        customAxis,
        rotationAngle
      );
      pivotRef.current.quaternion.copy(customRotation);

      if (!axisShow.current) {
        axisShow.current = new THREE.ArrowHelper(
          customAxis,
          new THREE.Vector3(0, 0, 0),
          5,
          0xffff00
        );
        chuckRef.current.add(axisShow.current);
      }
    }
  }, [rotationAngle]);

  return (
    <>
      <group ref={pivotRef} position={[0, 0, 0]}>
        <mesh ref={chuckRef} geometry={customGeometry} position={position}>
          <meshBasicMaterial color={color} side={THREE.DoubleSide} />
          <lineSegments geometry={shapeFaceEdgeLine}>
            <lineBasicMaterial color="black" />
          </lineSegments>
        </mesh>
      </group>
    </>
  );
};

export default ReverseChuck;
