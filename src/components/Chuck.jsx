import * as THREE from "three";

const Chuck = ({ position, color, rotation, meshRef }) => {
  const YVERTEX = Math.sqrt(3);
  const customGeometry = new THREE.BufferGeometry();
  const shapeFaceEdgeLine = new THREE.EdgesGeometry(customGeometry);
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
    3, 4, 5,
    0, 1, 3,
    1, 4, 5,
    1, 2, 5,
    2, 3, 5,
  ];

  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);

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
