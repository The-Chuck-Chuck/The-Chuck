import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const ReverseChuck = ({
  targetIndex,
  index,
  position,
  quaternion,
  color,
  highlightOn = false,
  onPointerDown,
}) => {
  const isClickedIndex = targetIndex === index;
  const [emissiveIntensity, setEmissiveIntensity] = useState(0);

  // prettier-ignore
  const vertexArray = new Float32Array([
    -2.5, 0, -1.75,
    0, -2.5, -1.75,
    2.5, 0, -1.75,
    -2.5, 0, 1.75,
    0, -2.5, 1.75,
    2.5, 0, 1.75,
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
  ];

  const customGeometry = new THREE.BufferGeometry();

  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);
  customGeometry.computeVertexNormals();
  customGeometry.computeBoundingBox();
  customGeometry.computeBoundingSphere();

  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  useEffect(() => {
    if (isClickedIndex) {
      const interval = setInterval(() => {
        setEmissiveIntensity((prev) => (prev === 3 ? 1 : 3));
      }, 500);

      return () => clearInterval(interval);
    } else {
      setEmissiveIntensity(0);
    }
  }, [isClickedIndex]);

  return (
    <>
      <mesh
        geometry={customGeometry}
        position={position}
        quaternion={new THREE.Quaternion(...quaternion)}
        onPointerDown={onPointerDown}
      >
        <meshToonMaterial
          color={color}
          side={THREE.DoubleSide}
          emissive={"#006e04"}
          emissiveIntensity={
            highlightOn ? (isClickedIndex ? emissiveIntensity : 1) : 0
          }
        />
        {highlightOn && (
          <lineSegments geometry={shapeFaceEdgeLine}>
            <lineBasicMaterial color="#efefef" />
          </lineSegments>
        )}
      </mesh>
    </>
  );
};

export default ReverseChuck;
