# Chuck-Chuck

<img width="700" alt="스크린샷 2024-12-27 오후 12 05 22" src="https://github.com/user-attachments/assets/9f46b7d1-9580-46e5-ac79-e11fc0df9322" />

척척이는 삼각 도형들이 일자로 이어져 있는 큐브 시뮬레이션입니다. 척척이를 회전시켜 강아지, 코브라, 오리 등 원하는 모양을 만들 수 있습니다.

[배포 주소](https://chuckchuck-simulator.netlify.app/)

## 목차

- 선정 사유
- 사용 기술
- 미리보기
  - 통합 시연 영상(유튜브)
  - 사용 방법
- 이슈사항
  - 회전 축을 잘못 설정하여 원하지 않는 방향으로 회전
  - 그룹화를 하기 위해 로컬과 월드 포지션 사용 및 그룹화
  - 충돌을 감지하기 위해 충돌 감지 기준을 설정
- 협동 방법
  - 생각 합치기
  - 6일의 딜레이를 극복한 팀 전략
- 팀 구성
  - 개인 깃 링크
  - 개인 회고

## 선정 사유

현재까지 배운 웹 개발을 통해서 공간 지능을 향상시킬 수 있는 것이 무엇이 있을까 고민했습니다. 프론트엔드 개발자는 좋은 코드를 쓰는 것도 중요하지만 여러 부서와 협력하여 나온 결과물을 잘 시각화하는 것도 중요합니다. 그렇기 때문에 개발자들의 공간 지능을 향상시켜 실무에 도움이 되길 바라는 마음으로 제작했습니다.

공간 지능이란 초기 시각 정보와 경험을 인식하고 변화시켜 다양하게 창조시키는 능력입니다. 색, 선, 모양, 그림 사이에 존재하는 여러 요소를 관리하하버스.

공간 지능은 단기간에 향상시키기는 힘듭니다. 출근 후나 개발 시작하기 전 뇌를 워밍업시킨다는 생각으로 척척이 시뮬레이션을 한다면 공간지능이 점차 향상되는 것을 경험할 수 있을 것입니다.

## 사용 기술

| 분류       | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발 언어  | <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 클라이언트 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/zustand-54283c?style=for-the-badge&logo=zustand&logoColor=black" /> <img src="https://img.shields.io/badge/three.js-%23323330.svg?style=for-the-badge&logo=threedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/React Three/fiber-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> <img src="https://img.shields.io/badge/React Three/drei-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> |
| 배포       | <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## 미리보기

## 이슈 사항

### 도형을 어떻게 회전 시켜야 할까?

(구현 gif 삽입 자리)(정상적인 완성본 회전 영상)
위 자료와 같이 척척이는 여러 도형 들이 하나의 묶음처럼 동시에 회전합니다.
묶음으로 움직이는 도형 하나에 대하여 각각 회전 시키는 것은 비효율적 이라 판단했습니다.
때문에 여러 도형을 한번에 회전시키는 것이 이 프로젝트의 핵심이라 생각했고,
가장 먼저 어떻게 묶어야 할지 고민했습니다.

#### 1. Mesh 와 Group

여러개의 도형을 한 묶음으로 관리하기 위한 방법으로 group 객체를 사용했습니다.

mesh 와 group 모두 자식 요소들을 묶음으로 관리 할 수 있는 객체 이지만,
저희가 group을 선택한 것에는 크게 2가지 이유가 있습니다.

1. 렌더링 성능
   mesh 객체는 화면에 렌더링이 되는 요소입니다.
   반대로 group 객체는 화면에 렌더링 되지 않습니다.
   저희의 모든 도형은 mesh 객체로 생성이 되어 이미 화면에 보여지고 있습니다.
   (관련 코드, 이미지 삽입)(0191efcd 척 컴포넌트 코드, 사진1-1)
   이렇듯 이미 존재하는 요소들을 단순히 묶어줄 대상이 필요했기에,
   mesh 객체를 사용해 렌더링을 한번 더 유발하는 것 보다 group 객체를 사용하는 것이
   더 효율적이라 판단했습니다.

2. 렌더링 여부에 따른 예외사항 고려
   모든 도형은 mesh 객체로 생성되어 있습니다.
   저희는 회전하는 도형들 과 고정되어 있는 도형들 에 대해 시각적인 차이를 준다면 사용자 편의성이
   향상 될 것이라 생각했습니다.
   그렇다면 mesh 의 material이란 속성을 통하여 시각적인 효과를 부여할 수 있게 되는데,
   실수로라도 부모 mesh의 material 수치에 접근하여 발생할 수 있는 예외사항을 사전에 차단하기 위해
   화면에 렌더링 되지 않는 group 객체를 선택했습니다.

이렇듯 여러 도형을 묶어줄 방법을 결정 한 다음 회전 동작을 구현할때 이 도형 들이 갖는 위치(position), 기울기(quaternion) 수치를 더 효율적으로 관리하기 위한 고민을 시작했습니다.

#### 2. State와 Ref

초기 도형의 생성시 위치 값 들어있는 배열을 state로 관리하고, 그 이후 위치와 기울기 수치 변화에 대해서는
ref를 사용했습니다.

useRef를 채택한 이유에 대해 알아보기에 앞서 간단하게 저희의 회전 동작 에 대해 말씀드리겠습니다.

척척이가 회전할때, 여러개의 도형을 하나의 묶음으로 움직이게 해야했고, 그 움직임은 한번에 목표 각도까지
회전하는 것이 아니라 회전 과정을 부드럽게 보여줘야만 했습니다. 그래야 사용자 입장에서 좀 더 부드러운
애니메이션 효과를 경험 할 수 있다 판단 하였고, 이를 위해서는 react-three-fiber의 useFrame 메서드를
사용해야 했습니다.

useRef의 채택 이유는 여기에서 부터 출발합니다.

1. useFrame의 동작 방식과 렌더링
   (useFrame 코드)(0191efcd)
   위와 같이 저희 코드는 현재 각도와 목표 각도를 비교하며, 목표 각도까지 회전하게 됩니다.
   이 과정에서 매 프레임마다 변화되는 각도를 상태로 관리하게 된다면 너무 잦은 렌더링을 유발하게
   되어 성능에 큰 무리를 주게된다 판단 하였고, three.js 렌더링 루프와 직접적으로 동기화 되어
   리액트 의 랜더링 과 무관하게 scene을 업데이트 해 줄 수있는 useRef를 사용하게 되었습니다.

2. react-three-fiber의 렌더링
   react three fiber 라이브러리는 리액트 에서 three.js 라이브러리를 사용할 수 있게 이 둘을
   결합해주는 라이브러리 입니다.
   동시에 이 둘의 렌더링 과정을 별개로 동작 가능하게 해주는 라이브러리 이기도 합니다.
   이 둘의 렌더링 루프는 서로 독립적 이기에 위와 같이 useRef를 사용하여 three.js의 객체에
   직접적으로 접근후 값을 변화 시켜도 리액트 에서의 리렌더링 없이 변화한 도형의 위치를
   화면에서 확인할 수 있게 됩니다.

이를 통해 저희는 회전하는 도형들을 그룹으로 관리하며 화면에 보여줄 수 있게 되었습니다.

### 문제 발견 (회전 시작점 고정 이슈)

그룹 회전에 대한 구상을 끝낸 후 실제 동작에서 저희 예상과는 다른 결과를 마주했습니다.
회전 그룹과 고정 그룹이 맞물린 형태가 아닌, 영점을 축으로 회전하는 모습이었습니다.
(구현 gif 삽입 자리 case 1,2 모두 삽입)(좌,우 영상)

#### 1. 회전축의 시작점이 고정되었다

실행 모습을 보고 가장 먼저 든 생각은 "축이 고정됐다" 였습니다.
왼쪽 그룹의 회전을 실행할때는 첫번째 도형이 영점에 고정된 형태로 회전을 하였고,
오른쪽 그룹의 회전을 실행할때 역시 첫번째 도형이 영점을 바라보는 형태로 큰 호를 그리며 회전을 하였습니다.
(코드 삽입 cb74752f 시뮬 컨트롤러 클릭, 컨버스페인터 클릭, 회전)

실제로 ==이때 당시== 로직을 살펴보면 모든 도형은 하나의 group 객체로 관리되고 있습니다.
이 하나의 그룹을 참조하는 groupRef가 존재하고, 회전 도형들이 정해지면 새로운 임시 그룹 참조 selectGroupRef가 생성되어, 기존 groupRef의 동일 참조 도형들을 대체합니다.

이 과정에서 새로운 selectGroupRef의 요소들이 회전을 할때 groupRef의 기준 포지션인 (0,0,0) 을 축으로
회전하는 문제를 확인 할 수 있었습니다.

#### 2. 다양한 시도

해당 이슈를 하기 위해 팀원 모두가 서로 다른 방법으로 해결을 시도하고, 그날의 의사코드 및 코드 일부를 기록으로 남겨두었습니다.
(노션 페이지 캡쳐 이미지)
몇가지 예시를 작성하자면

1. 모든 도형을 개별 mesh 객체로 유지하고, 회전 도형에 대해서만 그룹을 형성한다.
   (관련 코드 삽입)
2. 부모 그룹의 포지션 위치를 회전에 맞춰 변화시킨다.
   (관련 코드 삽입)

이렇듯 다양한 시도 끝에 저희가 원하는 동작을 하는 해결 방법이 나오게 되었습니다.
<br><br>

### 어떻게 충돌을 감지할 수 있을까?

Three.js에서는 충돌을 감지하는 라이브러리가 존재하지 않기 때문에 Ammo.js 또는 Cannon.js 같은 물리엔진을 사용하거나 충돌 함수를 직접 구현해야했습니다. 충돌 감지는 이 프로젝트에서 핵심적인 기능이라고 판단했기 때문에 물리엔진을 사용해서 구현하는 것 보다는 충돌 함수를 구현하는 것이 팀원들의 성장에도 도움이 되고 더욱 챌리지적인 요소라고 판단하여 직접 구현하기로 결정했습니다.

Three.js에서는 크게 BoundingBox, Raycasting, Vertex(정점) 이 3가지 방법으로 통해서 두 물체간의 거리를 감지하여 정해놓은 수치(충돌로 인식하는 수치)만큼 두 물체가 가까워지면 충돌이 되었다고 판단하게 할 수 있습니다.

### 1. BoundingBox

처음에는 많이 사용되는 방법인 BoundingBox를 선택했습니다. 먼저 회전하는 삼각도형과 회전하지 않는 삼각도형에 BoundingBox를 계산합니다. 그리고 회전하는 삼각도형의 마지막 회전이 회전하지 않는 삼각도형의 BoundingBox와 닿게 된다면 충돌로 인식하게 하였습니다.

<details>
<summary>삼각도형에 BoundingBox 계산</summary>
<div markdown="1">

```jsx
const detectConflictBoundingBox = () => {
  const rotateMeshes = rotateGroupRef.current.children;
  const nonRotateMeshes = nonRotateGroupRef.current.children;
  const allMeshes = [...rotateMeshes, ...nonRotateMeshes];

  for (let i = 0; i < allMeshes.length; i++) {
    const box1 = new THREE.Box3().setFromObject(allMeshes[i]);

    for (let j = i + 1; j < allMeshes.length; j++) {
      const box2 = new THREE.Box3().setFromObject(allMeshes[j]);

      if (box1.intersectsBox(box2)) {
        return true;
      }
    }
  }
  return false;
};
```

</div>
</details>
<br><br>

BoundingBox만 계산할 경우 겹치는 경우에만 충돌을 감지할 수 있어서 임의의 수치로 거리 조절이 필요하다고 생각했습니다. 그래서 BoundingBox 위로 확장된 BoundingBox를 만들어서 임의의 수치을 통해 확장된 BoundingBox의 크기를 정하고 임의의 수치(충돌로 인식하는 최소거리) 조정을 통해 가까이 또는 멀리 감지하는 걸 조절할 수 있게 했습니다.

<details>
<summary>BoundingBox 충돌 거리 조정 추가</summary>
<div markdown="1">

```jsx
const detectConflictBoundingBox = () => {
  const rotateMeshes = rotateGroupRef.current.children;
  const nonRotateMeshes = nonRotateGroupRef.current.children;
  const collisionValue = 1.55;

  for (let i = 0; i < rotateMeshes.length; i++) {
    const box1 = new THREE.Box3().setFromObject(rotateMeshes[i]);

    for (let j = 0; j < nonRotateMeshes.length; j++) {
      const box2 = new THREE.Box3().setFromObject(nonRotateMeshes[j]);

      const expandedBox1 = box1.clone().expandByScalar(collisionValue / 2);
      const expandedBox2 = box2.clone().expandByScalar(collisionValue / 2);

      if (expandedBox1.intersectsBox(expandedBox2)) {
        console.log(`충돌 발생! 회전 척 ${i}과 비회전 척 ${j} 박스 교차`);
        return true;
      }
    }
  }
  return false;
};
```

</div>
</details>
<br><br>

아래 이미지를 통해서 BoundingBox를 통해 충돌 감지가 어떻게 되는지 쉽게 파악할 수 있습니다.

<img width="400" alt="바운딩박스 시각화" src="  
https://github.com/user-attachments/assets/bc24947a-c6bc-40d4-9def-e622741d1a32
" />
<br><br>

BoundingBox가 충돌로 인식하는 최소 거리는 확장된 BoundingBox와 상관없이 기존 BoundingBox가 겹치면 발생합니다. 진행하고 있는 프로젝트 척척이는 여러 개의 삼각도형들이 처음부터 붙어있고 또 회전하는 삼각도형도 회전하지 않는 삼각도형과 붙어 있는 상태에서 회전하기 때문에 어느 방향으로 회전을 시켜도 처음부터 BoundingBox가 겹쳐있습니다. 그래서 어떤 방향으로 회전을 시켜도 충돌로 인식하게 됩니다.

![바운딩박스 회전 충돌](https://github.com/user-attachments/assets/31955aa4-ed83-4bf7-9d53-bf14764ad932)
<img width="607" alt="바운딩박스 충돌 콘솔 1" src="  
https://github.com/user-attachments/assets/54e319bc-1625-4eb6-95c3-0f312ceacbda
" />
<br>

전체적인 로직 순서가 회전이 끝나고 충돌 감지 함수가 실행되기 때문에 삼각도형을 한 바퀴 회전 시켜 원래 모양을 그대로 유지해도 충돌을 감지하였습니다. 이 또한 BoundingBox가 처음부터 겹쳐있기 때문에 발생하는 문제입니다.

해당 문제 인식 후 BoundingBox로 충돌을 인식하는 건 이 프로젝트에 적합하지 않다고 판단하여 Raycaster 방식으로 방법을 전환하여 진행하였습니다.

![바운딩박스 제자리 회전 충돌.gif](https://github.com/user-attachments/assets/998ba73f-e00b-42c3-8a6c-b56a54c5822b)
<img width="607" alt="바운딩박스 충돌 콘솔 2" src="  
https://github.com/user-attachments/assets/f48e856f-9aa2-4a89-b258-b8f5c7fe0cf6
" />

### 2. Raycaster

두 번째로 시도한 방법은 Raycaster입니다. 이전에는 삼각도형 겉으로 박스 또는 구체를 생성해 감지를 했다면 Raycaster는 회전하는 삼각도형에서 여러 방향으로 광선을 발사합니다. 그 광선이 회전하지 않는 삼각도형에 닿게 되었을 때 충돌을 감지하도록 설정하였습니다.

`intersects[0].distance` 는 회전하는 삼각도형에서 발사한 광선이 회전하지 않는 삼각도형 처음 닿는 지점까지 거리를 나타냅니다. 이 거리가 임의의 수치(충돌로 인식하는 최소거리)보다 작다면 충돌로 인식하게 됩니다.

<details>
<summary>Raycaster 충돌 감지</summary>
<div markdown="1">

```jsx
const detectConflictRaycaster = () => {
  const rotateMeshes = rotateGroupRef.current.children;
  const nonRotateMeshes = nonRotateGroupRef.current.children;
  const collisionDistance = 1.55;

  const raycaster = new THREE.Raycaster();
  const directions = [
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 1, 0),
    new THREE.Vector3(0, -1, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(0, 0, -1),
  ];

  for (let i = 0; i < rotateMeshes.length; i++) {
    const mesh = rotateMeshes[i];
    const position = new THREE.Vector3();
    mesh.getWorldPosition(position);

    for (let j = 0; j < nonRotateMeshes.length; j++) {
      for (const checkDirection of directions) {
        raycaster.set(position, checkDirection.normalize());
        const intersects = raycaster.intersectObject(nonRotateMeshes[j]);

        if (intersects.length > 0) {
          console.log(
            `회전 척 ${i}과 비회전 척 ${j} 사이 레이 거리`,
            intersects[0].distance
          );

          if (intersects[0].distance < collisionDistance) {
            console.log(
              `충돌 발생한 회전 척 ${i}과 비회전 척 ${j} 사이 레이 거리`,
              intersects[0].distance
            );
            return true;
          }
        }
      }
    }
  }
  return false;
};
```

</div>
</details>
<br><br>

아래 이미지를 통해 Raycaster가 어떤 식으로 광선을 발사해 충돌을 감지하는지 알 수 있습니다.

<img width="400" alt="레이케스터 시각화" src="  
https://github.com/user-attachments/assets/3a9a5c6c-7cdf-49a9-96cb-075ea68b0ae9
" />
<br>

Raycaster에서 이전에 발생하던 문제들은 나타나지 않았으나 제일 중요한 부분에서 문제가 발생했습니다. 척척이의 모양 특성상 서로 포개지는 모양을 만들 수 있는데 이 모양을 만들게 되면 충돌로 인식하게 되었습니다. 서로 포개지는 모양이 되었을 때 면과 면이 닿는 순간 충돌로 인식하기 때문입니다.

임의의 수치(충돌로 인식하는 최소거리)을 조절 해보았지만 면과 면이 닿았을 때는 이미 임의의 수치(충돌로 인식하는 최소거리)보다 가까운 상태가 되기 때문에 수치 조정이 의미가 없는 상태가 되었습니다.

[참고] 서로 포개지는 모양
<img width="500" alt="서로 포개지는 모양 사진" src="  
https://github.com/user-attachments/assets/936b729e-a628-4004-ab29-f80f8abf829b" />

![레이케스터 충돌 오류.gif](https://github.com/user-attachments/assets/fa6889db-ccf6-4f36-b7c5-e7da9643ebc4)
<img width="454" alt="레이케스터 콘솔" src="  
https://github.com/user-attachments/assets/c5b50820-6d13-4589-a8f8-221635b18a23" />

Raycaster를 사용하면 서로 포개지는 부분을 계속 충돌로 인식하기 때문에 이 프로젝트에는 적합하지 않다고 판단하여 Vertex를 통해 중심점을 구하고 중심점의 거리 간격을 통해 충돌을 감지하는 방법으로 전환하였습니다.

### 3. Vertex(정점) and Center

처음에는 삼각도형을 이루는 Vertex(정점)들을 구하여 Vertex(정점)들이 닿는 거리를 기준으로 충돌을 구현하려고 했습니다. 하지만 위 방법도 서로 포개지는 모양에서는 계속 충돌로 인식할거라 판단하여 Vertex(정점)만 갖고는 정확한 충돌을 감지하기 힘들다고 생각했습니다.

<details>
<summary>삼각도형의 Vertex 계산</summary>
<div markdown="1">

```jsx
const vertices = mesh.geometry.attributes.position.array;
const matrix = mesh.matrixWorld;

for (let v1 = 0; v1 < vertices1.length; v1 += 3) {
  const vertex = new THREE.Vector3(
    vertices[v1],
    vertices[v1 + 1],
    vertices[v1 + 2]
  ).applyMatrix4(matrix);
}
```

</div>
</details>
<br><br>

아래 이미지를 통해 Vertex(정점)이 어떤 식으로 충돌을 감지하는지 알 수 있습니다.

<img width="400" alt="버텍스 시각화" src="  
https://github.com/user-attachments/assets/6c3418fb-1799-4864-8b48-38c85d66b2d6
" />

서로 포개지는 모양처럼 선 또는 면들이 닿았을 때도 충돌로 인식하지 않는 방법이 무엇이 있을까 고민을 했을 때 Vertex(정점)들의 위치를 모두 더하여 Vertex(정점)의 수만큼 나누고 Vertex(정점)의 평균 위치를 구하면 될 것이라 판단했습니다. 즉, 이 방법은 삼각도형의 중심점을 구하는 방법입니다.

<details>
<summary>Vertex를 통해 중심점 계산</summary>
<div markdown="1">

```jsx
const detectConflict = () => {
  const rotateMeshes = rotateGroupRef.current.children;
  const nonRotateMeshes = nonRotateGroupRef.current.children;

  const allMeshes = [...rotateMeshes, ...nonRotateMeshes];
  const centerMap = allMeshes.map((mesh) => getCenterPosition(mesh));

  for (let i = 0; i < centerMap.length; i++) {
    for (let j = i + 1; j < centerMap.length; j++) {
      const distance = centerMap[i].distanceTo(centerMap[j]);
      console.log(`회전 척 ${i}와 척 ${j} 사이 거리:`, distance);
      if (distance < 1.55) {
        console.log(`충돌 발생! 회전 척 ${i}와 척 ${j} 사이 거리:`, distance);
        return true;
      }
    }
  }
  return false;
};

const getCenterPosition = (mesh) => {
  const vertex = mesh.geometry.attributes.position.array;
  const center = new THREE.Vector3();
  const tempVertex = new THREE.Vector3();

  let vertexCount = 0;

  for (let i = 0; i < vertex.length; i += 3) {
    tempVertex.set(vertex[i], vertex[i + 1], vertex[i + 2]);
    tempVertex.applyMatrix4(mesh.matrixWorld);
    center.add(tempVertex);
    vertexCount++;
  }

  center.divideScalar(vertexCount);

  return center;
};
```

</div>
</details>
<br><br>

아래 이미지를 통해 Vertex(정점)으로 구한 중심점의 위치가 어디에 있는지 알 수 있습니다.

<img width="400" alt="버텍스센터 시각화" src="  
https://github.com/user-attachments/assets/120df54a-f3d3-4789-9f31-ef961e2d0d84
" />

회전하는 삼각도형의 중심점과 회전하지 않는 삼각도형의 중심점의 거리가 임의의 수치(충돌로 인식하는 최소거리)보다 작게되면 충돌로 인식하게 설정했습니다.

그리고 임의의 수치는 테스트를 통해 삼각도형이 서로 겹치면 충돌이지만 선 또는 면이 닿았을 때는 충돌로 인식하지 않도록 수치를 설정했습니다.

최종적으로 위 방법을 통해 충돌 감지 함수를 구현했을 때 서로 포개지는 모양에서도 충돌로 인식하지 않고 잘 작동하는 것을 확인했습니다.

![최종코드 포개짐 모양.gif](https://github.com/user-attachments/assets/4fcba8f0-91b0-490e-97d2-03e5614aab43)
<img width="449" alt="정상작동 콘솔" src="  
https://github.com/user-attachments/assets/e66f229e-82dd-4fcd-a65b-9db228622261
" />

서로 포개지는 모양이 되었을 때 거리가 임의의 수치(1.55)보다 크기 때문에 충돌로 인식하지 않고 정상적으로 작동하고 있습니다.

또 서로 포개지는 모양처럼 문제가 될 것 같은 모양들을 테스트 해봤을 때도 문제 없이 작동하는 것을 확인했습니다.

![최종 정상 충돌감지 1.gif](https://github.com/user-attachments/assets/84acf4a0-e1ae-4811-9c05-1fa95c97aace)

![최종 정상 작동 모양.gif](https://github.com/user-attachments/assets/0f124155-284c-4951-90c5-beeac5969aa3)

## 협동 방법

### 1. 원활한 협업 진행을 위한 방향 일치화

프로젝트를 진행할 때 팀원 간의 생각을 일치시키는 과정이 중요하다고 판단했습니다. 동일한 주제로 대화할 때 각기 다른 관점에서 해석될 수 있습니다. 이러한 상황이 지속되면 서로의 의도를 명확히 이해하지 못 하고, 프로젝트 진행에 차질이 생길 수 있다고 판단했습니다.

이러한 문제를 해결하기 위해 크게 세 가지 방식을 도입했습니다.

**1-1. 정기적인 회의 시행**

팀원 간의 방향성 일치를 지속시키기 위해 하루에 두 번, 오전과 오후로 나누어 정기적인 회의를 진행했습니다. 오전 회의는 전날 밤에 추가로 진행한 작업과 당일에 해야 할 작업에 관한 내용을 공유하였습니다. 오후 회의에는 코드를 작성하며 발생한 문제에 대해 논의하고, 팀 프로젝트 진행 방향에 대한 회고를 KPT 형식으로 진행했습니다.

이러한 방식은 팀원 간의 소통을 강화하고, 프로젝트 진행에 필요한 정보를 신속히 공유할 수 있도록 하였습니다.

**1-2. 문서 양식의 통일화**

정보의 일관된 정리와 동일한 관점을 공유하기 위해 문서의 서식을 만들었습니다. 회의록 작성 시 작성자에 따라 내용의 통일성이 떨어지는 문제를 해결하기 위해 문서 형식을 안건과 결론으로 구분하였습니다. 안건은 발생한 문제와 이에 대한 다양한 의견 및 관점을 기록했으며, 결론에는 논의된 결과를 명확히 작성하였습니다.

이러한 방식은 회의 진행 시에 팀원 간의 관점 차이를 최소화할 수 있도록 하였습니다.

**1-3. 통일된 용어 사용**

팀 내부에서 공통으로 이해할 수 있는 용어를 정의함으로써, 문서 작성이나 대화 중에 발생할 수 있는 혼란을 최소화하였습니다. 예를 들어 척척이의 요소가 되는 “삼각 도형 하나”를 “척”이라는 간략한 단어로 통일함으로써 작업 중 혼란을 줄이고 효율성을 높이고자 했습니다.

이러한 방식은 팀원 간의 원활한 소통을 가능하게 하였습니다.

팀원 간의 생각을 일치시킴으로써 팀의 협업 능력이 향상되었으며, 일관된 방향으로 프로젝트를 진행할 수 있었습니다. 이러한 접근 방식을 통해 오해와 혼란을 줄이고 팀 내의 소통이 개선되었습니다.

### 2. 협업을 통한 핵심 태스크 지연 문제 해결 방안

특정 태스크가 예상한 시간보다 6일이 더 소요되어 전체 프로젝트 일정에 상당한 영향을 미치는 문제가 발생했습니다. 이 태스크는 프로젝트의 핵심 기능이었기 때문에 신속하게 해결하는 것이 필수적이었습니다.

이러한 문제 해결을 위해 두가지 방법을 시도했습니다.

**2-1. 병렬적인 테스트 진행**

세 명의 팀원이 함께 태스크를 분담하여 진행함으로써 자료 조사 시간을 단축하고, 다양한 접근 방식을 동시에 시도할 수 있었습니다. 팀원이 모두 다른 내용의 테스트를 진행함으로써 작업이 병렬적으로 수행되고, 전체적인 진행 속도를 향상시킬 수 있을 것으로 판단했습니다. 이를 통해 한 명이 작업하는 것보다 더 빠르고 효율적으로 문제를 해결할 수 있었습니다.

**2-2. 자료 공유 및 협력 강화**

테스트를 진행하기 전에 각 팀원이 어떻게 접근할지에 대한 의사 코드를 작성하여 공유함으로써 작업 방향을 명확히 하였습니다. 의사 코드를 통해 팀원 간의 작업 이해도를 높이고, 방향성을 명확히 할 수 있도록 했습니다. 이는 효율적인 작업을 진행할 수 있도록 했고, 중복 작업을 방지하는 데 큰 도움이 되었습니다.

또한 각자가 조사한 부분이나 시도한 내용에 대한 자료를 작성해 공유하였습니다. 이를 통해 팀원 간의 자료 공유를 통해 불필요한 자료 조사 시간을 줄였습니다. 특히 막히는 부분을 공유하고 논의를 통해 발생한 문제에 신속하게 대응할 수 있었습니다.

팀원 간의 지속적인 진행 상황 공유를 통해 프로젝트의 올바른 방향성을 유지하고, 상호 점검을 통해 발생한 문제들을 신속하게 해결할 수 있었습니다. 이와 같은 협업 방식을 통해 밀린 태스크를 성공적으로 해결했으며, 예정된 기간 내에 핵심 기능을 모두 완성하여 프로젝트를 마무리 지을 수 있었습니다.

| <img width="200" alt="회의록" src="https://github.com/user-attachments/assets/9851c2be-0d11-44ad-89e9-f3c2ef51dca0" /> | <img width="200" alt="칸반_태스크" src="https://github.com/user-attachments/assets/d2598442-aaee-4879-8c7e-ece154e13885" />     | <img width="200" alt="이슈_기록" src="https://github.com/user-attachments/assets/c3adf3b7-5ee9-4942-86c5-5ca12db89d88" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [회의록](https://balsam-ceramic-da1.notion.site/1297aad7a2ea819ea182d08d848f463c?pvs=4)                                | [칸반 태스크 캘릭터](https://www.notion.so/Chuck-Chuck-1297aad7a2ea8054bc6cf050c979133c?pvs=4#1297aad7a2ea810c9020c322c1573833) | [이슈 기록 페이지](https://balsam-ceramic-da1.notion.site/1337aad7a2ea8016972ff891dea5c6b2?pvs=4)                         |

## Team Members

### 정민지

척척이 프로젝트를 진행하며 three.js를 처음 접해 보고 3D를 다루는 과정을 경험했습니다. 웹 개발을 배우는 동안 2D의 공간에서만 작업하다 3D 작업을 진행하게 되니 좌표에 따라 달라지는 회전의 각을 구하거나 면이 맞물리게 회전시키는 등 저희의 한계를 시험하는 기술적 챌린지가 많았습니다.

이러한 어려움을 극복하는 과정에서 예상치 못한 난관을 겪으며 좌절을 경험하기도 했지만, 팀원들과 서로의 지식을 공유하고 함께 헤쳐 나가는 과정에서 문제를 해결하고 극복하는 경험도 할 수 있었습니다.

[정민지 개인 Github](https://github.com/miinje)

### 홍성남

척척이 프로젝트는 저에게 매 순간이 도전이며 의미가 깊은 프로젝트였습니다. 개발 공부를 시작한 이후 처음 진행한 프로젝트임과 동시에 처음 팀으로써 진행한 프로젝트이기도 합니다.
처음으로 써보는 3D 라이브러리를 사용하여 직접 점선면을 계산해 도형을 만드는 것, 위치에 따라 변화하는 회전축 기울기를 계산하는 것, 우리를 가장 힘들게 한 여러 도형의 회전을 관리하는 것 등 어느 하나 쉬운 것 없이 기술적인 어려움을 맞닥뜨린 프로젝트였습니다.

이 과정들 속 매번 기술적 어려움을 마주할 때마다 내가 이걸 해낼 수 있을까란 막연함이 찾아왔지만, 새로운 개념에 대해 학습하고 이 지식을 팀원들과 공유하는 시간을 통해 혼자서는 생각해 내지 못했을 창의적인 해답들을 찾아 낼수 있게 되었습니다.
한 달이라는 짧은 시간 동안 새로운 것을 학습하고 적용하는 방법, 더하여 팀으로 소통하고 협업하는 방식을 경험할 수 있어 의미가 깊었고, 매번 힘이 되어준 척하면척 팀원분들에게 다시 한번 감사드립니다!!

[홍성남 개인 Github](https://github.com/Seongnam-si)

### 김동현

이 프로젝트 후기를 한 단어로 표현한다면 롤러코스터라고 할 수 있을 것 같다.
그만큼 우여곡절도 많았고 좋은 경험도 많았다라고 볼 수 있다.
처음 프로젝트를 시작할 때는 걱정과 설렘이 공존했다. 아직도 코딩이 어려운데 프로젝트를 해도 되는 걸까? 라는 걱정과 팀으로 힘을 합쳐 무언가를 만든다는 것이 도파민이 뿜어져 나오게 했다.

팀 프로젝트의 가장 큰 장점은 나와 성격이 다른, 생각하는 방식이 다른 사람들이 모여서 생각하는 방향을 일치시키려고 노력한다는 것이다. 의견을 어필하기 위해 설득을 하고 때로는 설득을 당하기도 하면서 조율을 배울 수 있다. 누군가가 봤을 때는 적당히 수용하고 넘어가면 되는 거 아니야? 라고 할 수도 있지만 자신에게 정말 중요한 일이라면 쉽게 넘길 수는 없을 것이다.

결론적으로 이번 프로젝트를 통해 상대방의 의견을 좀 더 깊이 이해하는 방법을 조금이나마 알게 된 것 같다. 그리고 혼자서는 불가능한 것이지만 서로 부족한 점을 채워주며 완성할 수 있다는 경험은 두고두고 좋은 기억으로 남을 것 같다.

[김동현 개인 Github](https://github.com/Frogman113)
