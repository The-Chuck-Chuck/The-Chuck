import { useState, useEffect } from "react";
import * as THREE from "three";

const ReverseChuck = ({ position, color, onPointerDown, rotationAngle }) => {
  const [lineColor, setLineColor] = useState("black");
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
  ]

  useEffect(() => {
    if (rotationAngle) {
      setLineColor("white");
    }
  }, [rotationAngle]);

  const customGeometry = new THREE.BufferGeometry();

  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);
  customGeometry.computeBoundingBox();
  customGeometry.computeBoundingSphere();

  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  return (
    <>
      <mesh
        geometry={customGeometry}
        position={position}
        onPointerDown={onPointerDown}
      >
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
        <lineSegments geometry={shapeFaceEdgeLine}>
          <lineBasicMaterial color={lineColor} />
        </lineSegments>
      </mesh>
    </>
  );
};

export default ReverseChuck;
