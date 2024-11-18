import * as THREE from "three";

const ReverseChuck = ({ position, quaternion, color, onPointerDown }) => {
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

  const customGeometry = new THREE.BufferGeometry();

  customGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(vertexArray, 3)
  );
  customGeometry.setIndex(shapeFace);
  customGeometry.computeVertexNormals();
  customGeometry.computeBoundingBox();
  customGeometry.computeBoundingSphere();

  return (
    <>
      <mesh
        geometry={customGeometry}
        position={position}
        quaternion={new THREE.Quaternion(...quaternion)}
        onPointerDown={onPointerDown}
      >
        <meshToonMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default ReverseChuck;
