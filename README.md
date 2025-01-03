# Chuck-Chuck

척척이는 작은 삼각 도형들이 이어져 있는 큐브 시뮬레이션입니다. 척척이를 회전시켜 강아지, 뱀, 공룡 등 원하는 모양을 만들 수 있습니다.

<details>
<summary>척척이란?</summary>
<img width="300" alt="image" src="https://github.com/user-attachments/assets/3b4115c5-89cc-487f-ac66-e0af9269c61d" />
</details>

<br>
<br>
<br>
<a href="https://youtu.be/FcokVflyLLs">
<img width="600" alt="스크린샷 2024-12-27 오후 12 05 22" src="https://github.com/user-attachments/assets/9f46b7d1-9580-46e5-ac79-e11fc0df9322" />
</a>

위 이미지를 클릭하면 시현 및 사용 방법 영상을 시청할 수 있습니다.

[배포 주소](https://chuckchuck-simulator.netlify.app/)

## 목차

<!-- toc -->

- [선정 이유](#%EC%84%A0%EC%A0%95-%EC%9D%B4%EC%9C%A0)
- [개발 환경](#%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD)
- [문제 해결](#%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)
  - [도형을 어떻게 회전 시켜야 할까?](#%EB%8F%84%ED%98%95%EC%9D%84-%EC%96%B4%EB%96%BB%EA%B2%8C-%ED%9A%8C%EC%A0%84-%EC%8B%9C%EC%BC%9C%EC%95%BC-%ED%95%A0%EA%B9%8C)
    - [1. Mesh 와 Group](#1-mesh-%EC%99%80-group)
    - [2. State와 Ref](#2-state%EC%99%80-ref)
  - [문제 발견 (회전 시작점 고정 이슈)](#%EB%AC%B8%EC%A0%9C-%EB%B0%9C%EA%B2%AC-%ED%9A%8C%EC%A0%84-%EC%8B%9C%EC%9E%91%EC%A0%90-%EA%B3%A0%EC%A0%95-%EC%9D%B4%EC%8A%88)
    - [1. 회전축의 시작점이 고정되었다](#1-%ED%9A%8C%EC%A0%84%EC%B6%95%EC%9D%98-%EC%8B%9C%EC%9E%91%EC%A0%90%EC%9D%B4-%EA%B3%A0%EC%A0%95%EB%90%98%EC%97%88%EB%8B%A4)
    - [2. 다양한 시도](#2-%EB%8B%A4%EC%96%91%ED%95%9C-%EC%8B%9C%EB%8F%84)
    - [3. 수평 관계의 그룹화](#3-%EC%88%98%ED%8F%89-%EA%B4%80%EA%B3%84%EC%9D%98-%EA%B7%B8%EB%A3%B9%ED%99%94)

* [어떻게 충돌을 감지할 수 있을까?](#%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%B6%A9%EB%8F%8C%EC%9D%84-%EA%B0%90%EC%A7%80%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
  - [1. BoundingBox](#1-boundingbox)
  - [2. Raycaster](#2-raycaster)
  - [3. Vertex(정점) and Center](#3-vertex%EC%A0%95%EC%A0%90-and-center)

- [협업 방식](#%ED%98%91%EC%97%85-%EB%B0%A9%EC%8B%9D)
  - [1. 원활한 협업 진행을 위한 방향 일치화](#1-%EC%9B%90%ED%99%9C%ED%95%9C-%ED%98%91%EC%97%85-%EC%A7%84%ED%96%89%EC%9D%84-%EC%9C%84%ED%95%9C-%EB%B0%A9%ED%96%A5-%EC%9D%BC%EC%B9%98%ED%99%94)
  - [2. 협업을 통한 핵심 태스크 지연 문제 해결 방안](#2-%ED%98%91%EC%97%85%EC%9D%84-%ED%86%B5%ED%95%9C-%ED%95%B5%EC%8B%AC-%ED%83%9C%EC%8A%A4%ED%81%AC-%EC%A7%80%EC%97%B0-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EC%95%88)
- [개인 회고](#%EA%B0%9C%EC%9D%B8-%ED%9A%8C%EA%B3%A0)
  - [정민지](#%EC%A0%95%EB%AF%BC%EC%A7%80)
  - [홍성남](#%ED%99%8D%EC%84%B1%EB%82%A8)
  - [김동현](#%EA%B9%80%EB%8F%99%ED%98%84)

<!-- tocstop -->

## 선정 이유

아이디어를 구상하다 보니 어렸을 적 갖고 놀던 척척이가 생각났습니다. 요즘은 보기도 힘들뿐더러, 그게 무엇인지 모르는 사람이 태반일 겁니다.
그래서 그때 그 추억을 되살리며 프로젝트를 진행한다면 좋은 시너지를 얻을 수 있을 것이라 생각했습니다.

또, 일반 큐브와는 다르게 형식이 정해져 있지 않아 여러 방향의 움직임을 고려해야 하기 때문에 도전적인 요소도 충분할 것이라 생각하여 이 프로젝트를 시작했습니다.

## 개발 환경

| 분류       | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발 언어  | <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 클라이언트 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" /> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/zustand-54283c?style=for-the-badge&logo=zustand&logoColor=black" /> <img src="https://img.shields.io/badge/three.js-%23323330.svg?style=for-the-badge&logo=threedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/React Three/fiber-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> <img src="https://img.shields.io/badge/React Three/drei-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> |
| 배포       | <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

## 문제 해결

### 도형을 어떻게 회전 시켜야 할까?

![move-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/14524238-950e-4f04-aab4-6d60b089dd78)

위 자료와 같이 이 프로젝트는 여러 삼각 도형들이 하나의 묶음처럼 동시에 회전합니다.  
묶음으로 움직이는 도형 하나에 대하여 각각 회전시키는 것은 비효율적이라 판단했습니다.  
따라서 여러 도형을 한 번에 회전시키는 것이 이 프로젝트의 핵심이라 생각했고, 가장 먼저 어떻게 묶어야 할지 고민했습니다.

#### 1. Mesh 와 Group

여러 개의 도형을 한 묶음으로 관리하기 위한 방법으로 group 객체를 사용했습니다.  
mesh와 group 모두 자식 요소들을 묶음으로 관리 할 수 있는 객체이지만, 저희가 group을 선택한 이유는 크게 2가지입니다.

1. 렌더링 성능  
   mesh 객체는 화면에 렌더링이 되는 요소입니다. 반대로 group 객체는 화면에 렌더링되지 않습니다.  
    모든 도형은 mesh 객체로 생성되어 이미 화면에 보여지고 있습니다.

    <img width="400" height="200" src="https://github.com/user-attachments/assets/2771aad9-3ee5-4e3d-b6ee-60277d0bfc0f" />

   이처럼 이미 존재하는 요소들을 단순히 묶어줄 대상이 필요했기에, mesh 객체를 사용해 렌더링을 한 번 더 유발하는  
   것보다 group 객체를 사용하는 것이 더 효율적이라 판단했습니다.

2. 렌더링 여부에 따른 예외사항 고려
   모든 도형은 mesh 객체로 생성되어 있습니다.
   저희는 회전하는 도형들과 고정되어 있는 도형들에 대해 시각적인 차이를 준다면 사용자 편의성이 향상 될 것이라 생각했습니다.  
   그렇다면 mesh의 material이란 속성을 통하여 시각적인 효과를 부여할 수 있게 되는데, 실수로라도 부모 mesh의  
   material 수치에 접근하여 발생할 수 있는 예외사항을 사전에 차단하기 위해
   화면에 렌더링 되지 않는 group 객체를 선택했습니다.

이렇듯 여러 도형을 묶어줄 방법을 결정한 다음, 회전 동작을 구현할 때 이 도형들이 갖는 위치(position), 기울기(quaternion) 수치를 더 효율적으로 관리하기 위한 고민을 시작했습니다.

#### 2. State와 Ref

회전 동작을 구현할 때 이 도형들이 갖는 위치(position), 기울기(quaternion) 수치를 더 효율적으로 관리하기 위하여 useRef를 사용했습니다.
초기 도형의 생성 시 위치 값을 포함한 배열을 state로 관리하고, 이후 위치와 기울기 수치 변화에 대해서는 ref를 사용했습니다.

useRef를 채택한 이유를 살펴보기 전에, 저희의 회전 동작에 대해 간단히 설명드리겠습니다.  
전체 도형이 회전할 때, 여러 개의 도형을 하나의 묶음으로 움직여야 했고, 이 움직임은 한 번에 목표 각도까지 회전하는 것이 아니라 회전 과정을 부드럽게 보여주어야만 했습니다.  
이로 인해 사용자 입장에서 더 부드러운 애니메이션 효과를 경험할 수 있다고 판단했고, 이를 위해 React Three Fiber의 useFrame 메서드를 사용했습니다.

useRef를 채택한 이유는 이와 같은 동작 방식에서 출발합니다.

1. useFrame의 동작 방식과 렌더링

   ```jsx
   useFrame(() => {
     if (currentRotationAngle !== rotationAngle) {
       currentRotationAngle.current = THREE.MathUtils.lerp(
         currentRotationAngle.current,
         rotationAngle,
         0.02
       );
       생략;
     }
   });
   ```

   저희 코드는 현재 각도와 목표 각도를 비교하며 목표 각도까지 회전하게 됩니다.  
    이 과정에서 매 프레임마다 변화하는 각도를 상태로 관리하면 너무 잦은 렌더링을 유발해 성능에 큰 무리를 준다고 판단했습니다.  
    이에 Three.js 렌더링 루프와 직접적으로 동기화되어 React의 렌더링과 무관하게 scene(3D 물체가 존재하는 공간)을 업데이트해 줄 수 있는 useRef를 사용했습니다.

2. React Three Fiber의 렌더링  
   React Three Fiber는 React에서 Three.js를 사용할 수 있게 하고, 이 둘의 렌더링 과정을 별개로 동작 가능하게 해주는 라이브러리입니다.  
   이 둘의 렌더링 루프는 서로 독립적이기 때문에 useRef를 사용하여 Three.js의 객체에 직접적으로 접근한 후 값을 변경해도 React에서의 리렌더링 없이 변화한 도형의 위치를 화면에서 확인할 수 있습니다.

이를 통해 저희는 회전하는 도형들을 그룹으로 관리하며 화면에 보여줄 수 있게 되었습니다.

### 문제 발견 (회전 시작점 고정 이슈)

그룹 회전에 대한 구상을 끝낸 후 실제 동작에서 예상과는 다른 결과를 마주했습니다.  
회전 그룹과 고정 그룹이 맞물린 형태가 아닌, 영점을 축으로 회전하는 모습이었습니다.

![issue-left-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/502ba9ba-38e5-4efa-ae4e-ea20e95ecf6d)

#### 1. 회전축의 시작점이 고정되었다

실행 모습을 보고 가장 먼저 든 생각은 “축이 고정됐다”는 점이었습니다. 이 당시 로직을 살펴보면, 모든 도형은 하나의 group 객체로 관리되고 있었습니다.  
하나의 그룹을 참조하는 groupRef가 존재하고, 회전 도형들이 정해지면 새로운 임시 그룹 참조 selectGroupRef가 생성되어 기존 groupRef와 동일 참조 도형들을 대체합니다.  
이 과정에서 새로운 selectGroupRef의 요소들이 회전할 때, groupRef의 기준 포지션인 (0, 0, 0)을 축으로 회전하는 문제가 발생했습니다.

#### 2. 다양한 시도

해당 이슈를 해결하기 위해 팀원 모두 서로 다른 방법으로 해결을 시도했으며, 해당 날짜의 의사코드 및 코드 일부를 기록으로 남겼습니다.

<a href="https://balsam-ceramic-da1.notion.site/22363d0b809e4453970e7fa40eef965c?v=f3260fb42e0640bdb28e6f75fc8cf949&pvs=4">
  <img width="400" height="200" src="https://github.com/user-attachments/assets/86bc3e61-cd62-4c03-b814-9ec095258110" />
</a>

(사진을 클릭하시면 관련 문서를 확인 하실 수 있습니다.)

의사코드를 통해 당일 팀원이 시도한 내용을 쉽게 이해할 수 있었고, 이후 중복되지 않도록 추가적인 아이디어를 고민할 수 있었습니다.  
이와 같은 다양한 시도 끝에, 원하는 동작을 구현하는 해결 방법을 찾게 되었습니다.

### 3. 수평 관계의 그룹화

회전하는 그룹 selectGroupRef가 부모 요소인 groupRef에 종속되어, 회전축의 시작점이 groupRef의 기준 포지션인 (0, 0, 0)을 기준으로 회전한다는 문제점을 파악했습니다.  
문제를 해결하기 위해 그룹화 방식에 초점을 맞춰 아래와 같은 방식으로 해결했습니다.

1. 초기에 부모 그룹을 생성하지 않았습니다.  
   부모 그룹 없이 단순 mesh 객체만 나열한 후, 회전하는 순간 회전 도형과 비회전 도형 모두를 그룹화했습니다.

2. 회전하는 그룹을 다시한번 그룹으로 묶어, 포지션을 속였습니다.  
   기존 로직에서는 관계가 종속되어 회전 시작점이 (0, 0, 0)에 고정된다고 파악했습니다.
   이를 해결하기 위해 다음과 같은 방식으로 “포지션을 속였다”는 표현을 사용했습니다.

   - 회전하는 그룹을 다시 한번 그룹화했습니다. (이를 부모 그룹이라 부르겠습니다.)
   - 부모 그룹의 포지션을 원하는 회전 시작점으로 복사했습니다.
   - 이를 통해 회전 시작점을 원하는 위치로 설정할 수 있게 되었습니다.
   - 자식 그룹(실제 회전하는 도형들이 담긴 그룹)의 포지션을 시작점의 반대 방향으로 이동시켰습니다.
   - 이로써 부모 그룹과 자식 그룹은 서로 상대적인 위치를 갖게 되며, 부모 그룹을 회전시키면 자식 그룹이 부모 그룹의 시작점을 중심으로 도는 것처럼 보이게 되었습니다.

3. 회전이 끝난 시점에 그룹을 해제하여, 그룹이 없는 배열로 모든 도형을 화면에 보여주었습니다.

### 어떻게 충돌을 감지할 수 있을까?

Three.js에서는 충돌을 감지하는 라이브러리가 존재하지 않기 때문에 Ammo.js 또는 Cannon.js 같은 물리 엔진을 사용하거나 충돌 함수를 직접 구현해야 했습니다.  
충돌 감지는 이 프로젝트에서 핵심적인 기능이라고 판단했기 때문에 물리 엔진을 사용해서 구현하는 것보다는 충돌 함수를 구현하는 것이 팀원들의 성장에도 도움이 되고 더욱 도전적인 요소라고 판단하여 직접 구현하기로 결정했습니다.

Three.js에서는 크게 BoundingBox, Raycasting, Vertex(정점) 이 세 가지 방법을 통해서 두 물체 간의 거리를 감지하여 정해놓은 수치(충돌로 인식하는 수치)만큼 두 물체가 가까워지면 충돌이 되었다고 판단하게 할 수 있습니다.

### 1. BoundingBox

처음에는 많이 사용되는 방법인 BoundingBox를 선택했습니다. 먼저 회전하는 삼각 도형과 회전하지 않는 삼각 도형에 BoundingBox를 계산합니다. 그리고 회전하는 삼각 도형의 마지막 회전이 회전하지 않는 삼각 도형의 BoundingBox와 닿게 된다면 충돌로 인식하게 하였습니다.

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
</details><br>

BoundingBox만 계산할 경우 겹치는 경우에만 충돌을 감지할 수 있어서 임의의 수치로 거리 조절이 필요하다고 생각했습니다.  
그래서 BoundingBox 위로 확장된 BoundingBox를 만들어서 임의의 수치를 통해 확장된 BoundingBox의 크기를 정하고, 임의의 수치(충돌로 인식하는 최소 거리) 조정을 통해 가까이 또는 멀리 감지하는 것을 조절할 수 있게 했습니다.

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
</details><br>

아래 이미지를 통해서 BoundingBox를 통해 충돌 감지가 어떻게 되는지 쉽게 파악할 수 있습니다.

![바운딩박스 시각화](https://github.com/user-attachments/assets/bc24947a-c6bc-40d4-9def-e622741d1a32)

BoundingBox가 충돌로 인식하는 최소 거리는 확장된 BoundingBox와 상관없이 기존 BoundingBox가 겹치면 발생합니다.  
진행하고 있는 프로젝트 전체 도형은 여러 개의 삼각 도형들이 처음부터 붙어 있고, 또 회전하는 삼각 도형도 회전하지 않는 삼각 도형과 붙어 있는 상태에서  
회전하기 때문에 어느 방향으로 회전을 시켜도 처음부터 BoundingBox가 겹쳐 있습니다. 그래서 어떤 방향으로 회전을 시켜도 충돌로 인식하게 됩니다.

![바운딩박스 회전 충돌](https://github.com/user-attachments/assets/31955aa4-ed83-4bf7-9d53-bf14764ad932)
![바운딩박스 충돌 콘솔 1](https://github.com/user-attachments/assets/54e319bc-1625-4eb6-95c3-0f312ceacbda)

<br>

전체적인 로직 순서가 회전이 끝나고 충돌 감지 함수가 실행되기 때문에, 삼각 도형을 한 바퀴 회전시켜 원래 모양을 그대로 유지해도 충돌을 감지하였습니다.  
이 또한 BoundingBox가 처음부터 겹쳐 있기 때문에 발생하는 문제입니다.

해당 문제를 인식한 후 BoundingBox로 충돌을 인식하는 것은 이 프로젝트에 적합하지 않다고 판단하여 Raycaster 방식으로 방법을 전환하여 진행하였습니다.

![바운딩박스 제자리 회전 충돌.gif](https://github.com/user-attachments/assets/998ba73f-e00b-42c3-8a6c-b56a54c5822b)
![바운딩박스 충돌 콘솔 2](https://github.com/user-attachments/assets/f48e856f-9aa2-4a89-b258-b8f5c7fe0cf6)
" />

### 2. Raycaster

두 번째로 시도한 방법은 Raycaster입니다. 이전에는 삼각 도형 겉으로 박스 또는 구체를 생성해 감지했다면, Raycaster는 회전하는 삼각 도형에서 여러 방향으로 광선을 발사합니다.  
그 광선이 회전하지 않는 삼각 도형에 닿게 되었을 때 충돌을 감지하도록 설정하였습니다.

`intersects[0].distance`는 회전하는 삼각 도형에서 발사한 광선이 회전하지 않는 삼각 도형에 처음 닿는 지점까지의 거리를 나타냅니다.  
이 거리가 임의의 수치(충돌로 인식하는 최소 거리)보다 작다면 충돌로 인식하게 됩니다.

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
</details><br>

아래 이미지를 통해 Raycaster가 어떤 식으로 광선을 발사해 충돌을 감지하는지 알 수 있습니다.

![레이케스터 시각화](https://github.com/user-attachments/assets/3a9a5c6c-7cdf-49a9-96cb-075ea68b0ae9)
<br>

Raycaster에서 이전에 발생하던 문제들은 나타나지 않았으나, 가장 중요한 부분에서 문제가 발생했습니다.  
전체 도형의 구조 특성상 서로 포개지는 모양을 만들 수 있는데, 이 모양을 만들게 되면 충돌로 인식하게 되었습니다.  
이는 서로 포개지는 모양이 되었을 때 면과 면이 닿는 순간 충돌로 인식하기 때문입니다.

임의의 수치(충돌로 인식하는 최소 거리)를 조절해보았지만, 면과 면이 닿았을 때는 이미 임의의 수치(충돌로 인식하는 최소 거리)보다 가까운 상태가 되기 때문에 수치 조정이 의미가 없는 상태가 되었습니다.

[참고] 서로 포개지는 모양  
![서로 포개지는 모양 사진](https://github.com/user-attachments/assets/936b729e-a628-4004-ab29-f80f8abf829b)

![레이케스터 충돌 오류.gif](https://github.com/user-attachments/assets/fa6889db-ccf6-4f36-b7c5-e7da9643ebc4)
![레이케스터 콘솔](https://github.com/user-attachments/assets/c5b50820-6d13-4589-a8f8-221635b18a23)

Raycaster를 사용하면 서로 포개지는 부분을 계속 충돌로 인식하기 때문에 이 프로젝트에는 적합하지 않다고 판단하여, Vertex를 통해 중심점을 구하고 중심점의 거리 간격을 통해 충돌을 감지하는 방법으로 전환하였습니다.

### 3. Vertex(정점) and Center

처음에는 삼각 도형을 이루는 Vertex(정점)들을 구하여 Vertex(정점)들이 닿는 거리를 기준으로 충돌을 구현하려고 했습니다.  
하지만 위 방법도 서로 포개지는 모양에서는 계속 충돌로 인식할 것이라 판단하여, Vertex(정점)만으로는 정확한 충돌을 감지하기 힘들다고 생각했습니다.

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
</details><br>

아래 이미지를 통해 Vertex(정점)이 어떤 식으로 충돌을 감지하는지 알 수 있습니다.

![버텍스 시각화](https://github.com/user-attachments/assets/6c3418fb-1799-4864-8b48-38c85d66b2d6)

서로 포개지는 모양처럼 선 또는 면들이 닿았을 때도 충돌로 인식하지 않는 방법이 무엇이 있을까 고민했을 때, Vertex(정점)들의 위치를 모두 더하여 Vertex(정점)의 수만큼 나누고 Vertex(정점)의 평균 위치를 구하면 될 것이라 판단했습니다. 즉, 이 방법은 삼각 도형의 중심점을 구하는 방법입니다.

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
</details><br>

아래 이미지를 통해 Vertex(정점)으로 구한 중심점의 위치가 어디에 있는지 알 수 있습니다.

![버텍스센터 시각화](https://github.com/user-attachments/assets/120df54a-f3d3-4789-9f31-ef961e2d0d84)

회전하는 삼각 도형의 중심점과 회전하지 않는 삼각 도형의 중심점의 거리가 임의의 수치(충돌로 인식하는 최소 거리)보다 작게 되면 충돌로 인식하도록 설정했습니다.  
그리고 임의의 수치는 테스트를 통해 삼각 도형이 서로 겹치면 충돌로 인식하지만 선 또는 면이 닿았을 때는 충돌로 인식하지 않도록 수치를 설정했습니다.

최종적으로 위 방법을 통해 충돌 감지 함수를 구현했을 때, 서로 포개지는 모양에서도 충돌로 인식하지 않고 잘 작동하는 것을 확인했습니다.

![최종코드 포개짐 모양.gif](https://github.com/user-attachments/assets/4fcba8f0-91b0-490e-97d2-03e5614aab43)
![정상작동 콘솔](https://github.com/user-attachments/assets/e66f229e-82dd-4fcd-a65b-9db228622261)

서로 포개지는 모양이 되었을 때, 거리가 임의의 수치(1.55)보다 크기 때문에 충돌로 인식하지 않고 정상적으로 작동하고 있습니다.  
또 서로 포개지는 모양처럼 문제가 될 것 같은 모양들을 테스트해보았을 때도 문제없이 작동하는 것을 확인했습니다.

![최종 정상 충돌감지 1.gif](https://github.com/user-attachments/assets/84acf4a0-e1ae-4811-9c05-1fa95c97aace)

![최종 정상 작동 모양.gif](https://github.com/user-attachments/assets/0f124155-284c-4951-90c5-beeac5969aa3)

## 협업 방식

### 1. 원활한 협업 진행을 위한 방향 일치화

프로젝트를 진행할 때 팀원 간의 생각을 일치시키는 과정이 중요하다고 판단했습니다. 동일한 주제로 대화할 때 각기 다른 관점에서 해석될 수 있습니다. 이러한 상황이 지속되면 서로의 의도를 명확히 이해하지 못 하고, 프로젝트 진행에 차질이 생길 수 있다고 판단했습니다.
이러한 문제를 해결하기 위해 크게 세 가지 방식을 도입했습니다.

**1-1. 정기적인 회의 시행**

팀원 간의 방향성 일치를 지속시키기 위해 하루에 두 번, 오전과 오후로 나누어 정기적인 회의를 진행했습니다. 오전 회의는 전날 밤에 추가로 진행한 작업과 당일에 해야 할 작업에 관한 내용을 공유하였습니다. 오후 회의에는 코드를 작성하며 발생한 문제에 대해 논의하고, 팀 프로젝트 진행 방향에 대한 회고를 KPT 형식으로 진행했습니다. 회의를 통해 팀원 간의 소통을 강화하고, 프로젝트 진행에 필요한 정보를 신속히 공유할 수 있도록 하였습니다.

<table>
	<tr>
		<th>
			<img width="500" alt="회의록" src="https://github.com/user-attachments/assets/461473f1-2e54-4bd2-a2ad-93af0f464235" />
		</th>
	</tr>
	<tr>
		<td>회의록 일부 발췌</td>
	<tr>
</table>

**1-2. 문서 양식의 통일화**

정보의 일관된 정리와 동일한 관점을 공유하기 위해 문서의 서식을 만들었습니다. 회의록 작성 시 작성자에 따라 내용의 통일성이 떨어지는 문제를 해결하기 위해 문서 형식을 안건과 결론으로 구분하였습니다. 안건은 발생한 문제와 이에 대한 다양한 의견 및 관점을 기록했으며, 결론에는 논의된 결과를 명확히 작성하였습니다.

<table>
	<tr>
		<th>
			<img width="300" alt="문서양식_안건" src="https://github.com/user-attachments/assets/d118aebd-6665-45cd-9dc5-3193387c1756" />
		</th>
		<th>
			<img width="300" alt="문서양식_결론" src="https://github.com/user-attachments/assets/d0a452bd-091a-4d0b-a3c7-a2a4fbd8c519" />
		</th>
	</tr>
	<tr>
		<td>안건 양식 예시</td>
		<td>결론 양식 예시</td>
	<tr>
</table>

**1-3. 통일된 용어 사용**

팀 내부에서 공통으로 이해할 수 있는 용어를 정의함으로써, 문서 작성이나 대화 중에 발생할 수 있는 혼란을 최소화하였습니다. 예를 들어 척척이의 요소가 되는 "삼각 도형 하나"를 "척"이라는 간략한 단어로 통일함으로써 작업 중 혼란을 줄이고 효율성을 높이고자 했습니다.

<table>
	<tr>
		<th>
		<img width="489" alt="단어_통일하기" src="https://github.com/user-attachments/assets/ce3d2bb5-2e7c-400e-911c-0857c2824372" />
		</th>
	</tr>
	<tr>
		<td>회의 내용 일부 발췌</td>
	<tr>
</table>

이 세 가지 방식을 팀원 간의 생각을 일치시킴으로써 팀의 협업 능력이 향상되었으며, 일관된 방향으로 프로젝트를 진행할 수 있었습니다. 이러한 접근 방식을 통해 오해와 혼란을 줄이고 팀 내의 소통이 개선되었습니다.
13:11

### 2. 협업을 통한 핵심 태스크 지연 문제 해결 방안

특정 태스크가 예상한 시간보다 6일이 더 소요되어 전체 프로젝트 일정에 상당한 영향을 미치는 문제가 발생했습니다. 이 태스크는 프로젝트의 핵심 기능이었기 때문에 신속하게 해결하는 것이 필수적이었습니다.

이러한 문제 해결을 위해 두가지 방법을 사용했습니다.

**2-1. 병렬적인 테스트 진행**

세 명의 팀원이 함께 태스크를 분담하여 진행함으로써 자료 조사 시간을 단축하고, 다양한 접근 방식을 동시에 시도할 수 있었습니다. 팀원이 모두 다른 내용의 테스트를 진행함으로써 작업이 병렬적으로 수행되고, 전체적인 진행 속도를 향상시킬 수 있을 것으로 판단했습니다. 이를 통해 한 명이 작업하는 것보다 더 빠르고 효율적으로 문제를 해결할 수 있었습니다.

<table>
	<tr>
		<th>
		<img width="489" alt="의사코드_공유하기" src="https://github.com/user-attachments/assets/1c337a71-6414-46ca-903d-9168fab2dff5" />
		</th>
	</tr>
	<tr>
		<td>시도 내역 공유하기</td>
	<tr>
</table>

**2-2. 자료 공유 및 협력 강화**

테스트를 진행하기 전에 각 팀원이 어떻게 접근할지에 대한 의사 코드를 작성하여 공유함으로써 작업 방향을 명확히 하였습니다. 의사 코드를 통해 팀원 간의 작업 이해도를 높이고, 방향성을 명확히 할 수 있도록 했습니다. 이는 효율적인 작업을 진행할 수 있도록 했고, 중복 작업을 방지하는 데 큰 도움이 되었습니다.

<table>
	<tr>
		<th>
		<img width="400" alt="그룹화_리서치" src="https://github.com/user-attachments/assets/87383edd-a2b3-405d-8b65-7acc38ea3104" />
		</th>
	</tr>
	<tr>
		<td>리서치 공유</td>
	<tr>
</table>

또한 각자가 조사한 부분이나 시도한 내용에 대한 자료를 작성해 공유하였습니다. 이를 통해 팀원 간의 자료 공유를 통해 불필요한 자료 조사 시간을 줄였습니다. 특히 막히는 부분을 공유하고 논의를 통해 발생한 문제에 신속하게 대응할 수 있었습니다.

<table>
	<tr>
		<th>
		<img width="400" alt="그룹화_이슈" src="https://github.com/user-attachments/assets/f6f9ea06-b24d-4dee-a99b-776277c4cbae" />
		</th>
	</tr>
	<tr>
		<td>이슈 기록 공유</td>
	<tr>
</table>

팀원 간의 지속적인 진행 상황 공유를 통해 프로젝트의 올바른 방향성을 유지하고, 상호 점검을 통해 발생한 문제들을 신속하게 해결할 수 있었습니다. 이와 같은 협업 방식을 통해 밀린 태스크를 성공적으로 해결했으며, 예정된 기간 내에 핵심 기능을 모두 완성하여 프로젝트를 마무리 지을 수 있었습니다.

| <img width="200" alt="회의록" src="https://github.com/user-attachments/assets/9851c2be-0d11-44ad-89e9-f3c2ef51dca0" /> | <img width="200" alt="칸반_태스크" src="https://github.com/user-attachments/assets/d2598442-aaee-4879-8c7e-ece154e13885" />     | <img width="200" alt="이슈_기록" src="https://github.com/user-attachments/assets/c3adf3b7-5ee9-4942-86c5-5ca12db89d88" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [회의록](https://balsam-ceramic-da1.notion.site/1297aad7a2ea819ea182d08d848f463c?pvs=4)                                | [칸반 태스크 캘릭터](https://www.notion.so/Chuck-Chuck-1297aad7a2ea8054bc6cf050c979133c?pvs=4#1297aad7a2ea810c9020c322c1573833) | [이슈 기록 페이지](https://balsam-ceramic-da1.notion.site/1337aad7a2ea8016972ff891dea5c6b2?pvs=4)                         |

## 개인 회고

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
