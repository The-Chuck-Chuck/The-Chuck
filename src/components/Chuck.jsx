import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Chuck = ({ color, position, rotation, meshRef }) => {
  const YVERTEX = Math.sqrt(3);
  // prettier-ignore
  const vertexArray = new Float32Array([
      0, 0, 0,
      2, 0, 0,
      1, YVERTEX, 0,
      0, 0, 2,
      2, 0, 2,
      1, YVERTEX, 2,
    ]);
  // prettier-ignore
  const shapeFace = [
      0, 1, 2,
      1, 4, 2,
      2, 5, 4,
      5, 4, 3,
      5, 3, 2,
      2, 0, 3,
      0, 1, 4,
      0, 3, 4
    ];

  const customGeometry = new THREE.BufferGeometry();
  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);
  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);

  return (
    <>
      <mesh
        geometry={customGeometry}
        position={position}
        rotation={rotation}
        ref={meshRef}
      >
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments
        geometry={shapeFaceEdgeLine}
        position={position}
        rotation={rotation}
      >
        <lineBasicMaterial color="black" />
      </lineSegments>
    </>
  );
};

export default Chuck;
