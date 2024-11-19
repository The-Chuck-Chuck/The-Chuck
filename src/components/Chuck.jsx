import * as THREE from "three";

const Chuck = ({ position, quaternion, color, highlightOn, onPointerDown }) => {
  // prettier-ignore
  const vertexArray = new Float32Array([
    -2.5, 0, -1.75,
    2.5, 0, -1.75,
    0, 2.5, -1.75,
    -2.5, 0, 1.75,
    2.5, 0, 1.75,
    0, 2.5, 1.75,
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
          emissive={"#ab1103"}
          emissiveIntensity={highlightOn ? 1 : 0}
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

export default Chuck;
