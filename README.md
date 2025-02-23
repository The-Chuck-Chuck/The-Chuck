# Chuck-Chuck

척척이는 작은 삼각 도형들이 이어져 있는 큐브 시뮬레이션입니다. 척척이를 회전시켜 강아지, 뱀, 공룡 등 원하는 모양을 만들 수 있습니다.

<p align="center">
  <a href="https://chuckchuck-simulator.netlify.app/">
    <strong>
      배포 주소
    </strong>
  </a>
  <span> | </span>
  <a href="https://balsam-ceramic-da1.notion.site/Chuck-Chuck-1297aad7a2ea8054bc6cf050c979133c?pvs=4">
    <strong>
      노션 링크
    </strong>
  </a>
</p>
<br>

# 목차

<!-- toc -->

- [소개 영상](#%EC%86%8C%EA%B0%9C-%EC%98%81%EC%83%81)
- [프로젝트 동기](#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8F%99%EA%B8%B0)
- [개발 환경](#%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD)
- [문제 해결](#%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)
  * [1. 여러 도형을 한번에 회전시키는 방법](#1-%EC%97%AC%EB%9F%AC-%EB%8F%84%ED%98%95%EC%9D%84-%ED%95%9C%EB%B2%88%EC%97%90-%ED%9A%8C%EC%A0%84%EC%8B%9C%ED%82%A4%EB%8A%94-%EB%B0%A9%EB%B2%95)
    + [1-1. 여러 도형을 하나의 묶음으로 관리하기](#1-1-%EC%97%AC%EB%9F%AC-%EB%8F%84%ED%98%95%EC%9D%84-%ED%95%98%EB%82%98%EC%9D%98-%EB%AC%B6%EC%9D%8C%EC%9C%BC%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0)
    + [1-2. 회전하는 도형들의 값을 관리하는 방법](#1-2-%ED%9A%8C%EC%A0%84%ED%95%98%EB%8A%94-%EB%8F%84%ED%98%95%EB%93%A4%EC%9D%98-%EA%B0%92%EC%9D%84-%EA%B4%80%EB%A6%AC%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
  * [2. 회전의 시작점을 바꾸는 방법](#2-%ED%9A%8C%EC%A0%84%EC%9D%98-%EC%8B%9C%EC%9E%91%EC%A0%90%EC%9D%84-%EB%B0%94%EA%BE%B8%EB%8A%94-%EB%B0%A9%EB%B2%95)
    + [2-1. 고정된 그룹 회전의 시작점](#2-1-%EA%B3%A0%EC%A0%95%EB%90%9C-%EA%B7%B8%EB%A3%B9-%ED%9A%8C%EC%A0%84%EC%9D%98-%EC%8B%9C%EC%9E%91%EC%A0%90)
    + [2-2. 어떻게 그룹의 회전 시작점을 변경할 수 있을까?](#2-2-%EC%96%B4%EB%96%BB%EA%B2%8C-%EA%B7%B8%EB%A3%B9%EC%9D%98-%ED%9A%8C%EC%A0%84-%EC%8B%9C%EC%9E%91%EC%A0%90%EC%9D%84-%EB%B3%80%EA%B2%BD%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    + [2-3. 이중 그룹을 통한 시작점 문제 해결](#2-3-%EC%9D%B4%EC%A4%91-%EA%B7%B8%EB%A3%B9%EC%9D%84-%ED%86%B5%ED%95%9C-%EC%8B%9C%EC%9E%91%EC%A0%90-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0)
  * [3. 어떻게 충돌을 감지할 수 있을까?](#3-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%B6%A9%EB%8F%8C%EC%9D%84-%EA%B0%90%EC%A7%80%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
    + [3-1. BoundingBox를 활용한 충돌 감지](#3-1-boundingbox%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%B6%A9%EB%8F%8C-%EA%B0%90%EC%A7%80)
    + [3-2. Raycaster를 활용한 충돌 감지](#3-2-raycaster%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%B6%A9%EB%8F%8C-%EA%B0%90%EC%A7%80)
    + [3-3. Vertex(정점)와 Center를 활용한 충돌 감지](#3-3-vertex%EC%A0%95%EC%A0%90%EC%99%80-center%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%B6%A9%EB%8F%8C-%EA%B0%90%EC%A7%80)
  * [4. 이미지 저장 기능 구현하기](#4-이미지-저장-기능-구현하기)
    + [4-1. 캔버스 정보 가져오기](#4-1-캔버스-정보-가져오기)
    + [4-2. Blob 객체를 활용한 이미지 저장](#4-2-blob-객체를-활용한-이미지-저장)
- [프로젝트 문서화 및 공통 용어 정의를 통한 협업 개선](#%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%AC%B8%EC%84%9C%ED%99%94-%EB%B0%8F-%EA%B3%B5%ED%86%B5-%EC%9A%A9%EC%96%B4-%EC%A0%95%EC%9D%98%EB%A5%BC-%ED%86%B5%ED%95%9C-%ED%98%91%EC%97%85-%EA%B0%9C%EC%84%A0)
  * [1. 주기적인 회의 진행 및 기록](#1-%EC%A3%BC%EA%B8%B0%EC%A0%81%EC%9D%B8-%ED%9A%8C%EC%9D%98-%EC%A7%84%ED%96%89-%EB%B0%8F-%EA%B8%B0%EB%A1%9D)
  * [2. 문서 작성 템플릿 생성](#2-%EB%AC%B8%EC%84%9C-%EC%9E%91%EC%84%B1-%ED%85%9C%ED%94%8C%EB%A6%BF-%EC%83%9D%EC%84%B1)
  * [3. 팀 내 공통 용어 정의](#3-%ED%8C%80-%EB%82%B4-%EA%B3%B5%ED%86%B5-%EC%9A%A9%EC%96%B4-%EC%A0%95%EC%9D%98)
- [개인 회고](#%EA%B0%9C%EC%9D%B8-%ED%9A%8C%EA%B3%A0)
  * [정민지](#%EC%A0%95%EB%AF%BC%EC%A7%80)
  * [홍성남](#%ED%99%8D%EC%84%B1%EB%82%A8)
  * [김동현](#%EA%B9%80%EB%8F%99%ED%98%84)

<!-- tocstop -->

# 소개 영상

<a href="https://youtu.be/FcokVflyLLs">
<img width="100%" src="https://github.com/user-attachments/assets/d022879b-dc34-4da7-8410-7a46e5bc0f0d" />
</a>


# 프로젝트 동기

아이디어를 구상하는 중 어릴 적 가지고 놀았던 "척척이"가 떠올랐습니다. 현재는 이를 접하기 어렵고, 많은 사람들이 생소하게 느낄 것입니다.  
그렇기 때문에 그 시절의 추억을 되살려 프로젝트를 만들면 좋은 시너지를 얻을 수 있다고 생각합니다.

또한, 삼각 도형들이 함께 회전하며 일반 큐브보다 더 역동적이고, 단순해 보이지만 다양한 결과물을 만들 수 있기 때문에 도전적인 요소로 충분할 것이라 생각했습니다.

# 개발 환경

| 분류       | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발 언어  | <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 클라이언트 | <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/three.js-%23323330.svg?style=for-the-badge&logo=threedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/React Three/fiber-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> <img src="https://img.shields.io/badge/React Three/drei-f7f9ff?style=for-the-badge&logo=threedotjs&logoColor=black" /> <img src="https://img.shields.io/badge/zustand-54283c?style=for-the-badge&logo=zustand&logoColor=black" /> <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" /> <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" /> |
| 배포       | <img src="https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7" />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

# 문제 해결

## 1. 여러 도형을 한번에 회전시키는 방법

<img width="100%" src="https://github.com/user-attachments/assets/3e7bc3c9-c018-4fa5-8ae5-04c38468fb3a" />

이 프로젝트는 여러 삼각 도형이 하나의 묶음처럼 동시에 회전합니다.  이러한 움직임이 초기 구현 단계의 핵심이라 판단했으며, 어떻게 여러 도형을 묶고, 회전시키는 게 효율적일지에 대한 고민을 시작했습니다.

### 1-1. 여러 도형을 하나의 묶음으로 관리하기
> Mesh = 3D 도형을 만들기 위한 최소 단위의 객체  
> Group = 3D 객체(mesh)를 묶음으로 관리 해주는 객체

여러 개의 도형을 하나의 묶음으로 관리하기 위한 방법으로 group 객체를 사용했습니다.  
mesh와 group 모두 여러 도형을 하나의 묶음으로 관리 할 수 있는 객체이지만, group을 선택한 이유는 크게 2가지입니다.

1. 렌더링 성능  
mesh 객체는 화면에 렌더링이 되는 요소입니다. 반대로 group 객체는 화면에 렌더링되지 않습니다. 모든 도형은 mesh 객체로 생성되어 이미 화면에 보여지고 있습니다.  
이처럼 이미 존재하는 도형들을 단순히 묶어줄 대상이 필요했기에, mesh 객체를 사용해 렌더링을 한 번 더 유발하는 것보다 group 객체를 사용하는 것이 더 효율적이라 판단했습니다.

2. 렌더링 여부에 따른 예외사항  
모든 도형은 mesh 객체를 사용해 만들어 냈습니다. 이 도형들에 시각적인 차이를 통하여 회전하는 도형들과 고정된 도형들을 구분하고자 했고, 이를 위해서는 mesh 객체의 material 이란 속성을 사용해야 합니다.  
만약 이 도형들을 mesh 객체로 묶었을 때, 실수로 부모 mesh의 material 속성에 접근하여 잘못된 값을 부여한다면 의도하지 않은 예외 사항이 발생하게 됩니다.  
이러한 예외 사항을 사전에 차단하기 위하여 화면에 렌더링 되지 않는 group 객체를 선택했습니다.

**이렇듯 화면에 보이는 도형들을 보다 더 효율적으로 관리하기 위해 Group 객체를 사용하여 여러 도형들의 그룹화를 구현했습니다.**

### 1-2. 회전하는 도형들의 값을 관리하는 방법
> Scene = 3D 물체가 존재하는 공간 객체

회전 동작을 구현할 때 이 도형들이 갖는 위치(position), 회전(quaternion) 값을 더 효율적으로 관리하기 위하여 useRef를 사용했습니다.
초기 도형의 생성 시 위치 값을 포함한 배열을 state로 관리하고, 이후 위치와 기울기 수치 변화에 대해서는 ref를 사용했습니다.

useRef를 사용한 이유를 살펴보기 전에, 회전 동작에 대해 간단히 설명하겠습니다.  
사용자에게 부드러운 UI를 제공하기 위해 전체 도형이 회전하는 과정을 애니메이션으로 보여 주기 위해 React Three Fiber의 `useFrame` 메서드를 사용했습니다.
`useRef`는 `useFrame`을 활용한 애니메이션 동작을 원활하게 진행하기 위해 사용했습니다.

1. useFrame의 동작 방식과 렌더링

   ```jsx
   useFrame(() => {
     if (currentRotationAngle !== rotationAngle) {
       currentRotationAngle.current = THREE.MathUtils.lerp(
         currentRotationAngle.current,
         rotationAngle,
         0.02
       );
     }
   });
   ```

   이 코드는 현재 각도와 목표 각도를 비교하며 목표 각도까지 회전하게 됩니다.  
    이 과정에서 매 프레임마다 변화하는 각도를 상태로 관리하면 너무 잦은 렌더링을 유발해 성능에 큰 무리를 준다고 판단했습니다.  
    이러한 문제를 해결하기 위해 Three.js 렌더링 루프와 직접적으로 동기화되어 React의 렌더링과 무관하게 scene을 업데이트 해 줄 수 있는 useRef를 사용했습니다.

2. React Three Fiber의 렌더링  
   React Three Fiber는 React에서 Three.js 라이브러리를 사용할 수 있게 하고, 이 둘의 렌더링 과정을 분리하여 동작 가능하게 해주는 라이브러리입니다.  
   이 둘의 렌더링 루프는 서로 독립적이기 때문에 useRef를 사용하여 Three.js의 객체에 직접적으로 접근한 후 값을 변경해도 React에서의 리렌더링 없이 변화한 도형의 위치를 화면에서 확인할 수 있습니다.

**이를 통하여 저희는 도형의 회전 동작을 부드럽게 화면에 보여줄 수 있게 되었고, 이 과정에서 발생할 수 있는 과도한 렌더링을 막을 수 있게 되었습니다.**

## 2. 회전의 시작점을 바꾸는 방법

여러 도형을 회전시키는 방법에 대한 고민을 끝마친 후, 코드를 작성하고 처음 마주한 구현 화면은 저희의 예상과는 다른 모습이었습니다.  
일반적으로 척척이가 움직이는 회전 그룹과 고정 그룹이 맞물린 형태가 아닌, 영점 (화면상 도형의 왼쪽 하단)을 기준으로 도형이 회전하는 모습이었습니다.

<img width="50%" src="https://github.com/user-attachments/assets/fdffef21-75c8-4122-8728-8e3df8706b99"/><img width="50%" src="https://github.com/user-attachments/assets/4f678c1f-07a3-48c7-bfed-0dcf05535afa"/>

### 2-1. 고정된 그룹 회전의 시작점

사진과 같이 그룹으로 묶인 삼각 도형들의 회전 축이 고정된 채로 회전하는 문제가 있었습니다. 모든 도형 (mesh 객체)는 하나의 부모 group 객체로 묶여서 관리되고 있었습니다. 이때, 회전할 도형들이 정해지면 동적으로 새로운 그룹이 생성되며 이 새로운 그룹이 기존 부모 그룹의 자리를 대체합니다. 이 과정에서 새로운 그룹에 속하는 도형들이 회전할 때, 기존 부모 그룹의 기준 위치인 (0, 0, 0)을 축으로 회전하는 문제가 발생했던 것이었습니다.

<details>
<summary>2-1. 관련 내용 첨부 사진</summary>
<img width="100%" src="https://github.com/user-attachments/assets/5189bc4a-29d2-4ff2-8772-e9ef2a1bf948" />
<img width="100%" src="https://github.com/user-attachments/assets/11486d93-fd65-453b-9e57-cbe481e407f4" />
</details>

### 2-2. 어떻게 그룹의 회전 시작점을 변경할 수 있을까?

이러한 이슈를 해결하기 위해 팀원 모두 서로 다른 방법으로 해결을 시도했으며, 해당 날짜의 의사코드 및 코드 일부를 기록으로 남겼습니다.

<a href="https://balsam-ceramic-da1.notion.site/22363d0b809e4453970e7fa40eef965c?v=f3260fb42e0640bdb28e6f75fc8cf949&pvs=4">
  <img width="100%" src="https://github.com/user-attachments/assets/86bc3e61-cd62-4c03-b814-9ec095258110" />
</a>

의사코드를 통해 당일 팀원이 시도한 내용을 쉽게 이해할 수 있었고, 이후 중복되지 않도록 추가적인 아이디어를 고민할 수 있었습니다.  
이와 같은 시행착오 끝에, 원하는 동작을 구현하는 해결 방법을 찾게 되었습니다.

### 2-3. 이중 그룹을 통한 시작점 문제 해결

다양한 시행착오 끝에, 다음과 같은 단계를 통해 문제를 해결하고 회전의 시작점을 원하는 대로 변화시킬 수 있었습니다.

1. 초기에 부모 그룹을 생성하지 않았습니다.  
   1-1. 제일 처음 여러 개의 도형 (mesh 객체)이 생성 될 때, 도형을 묶어서 관리하지 않고, 전부 나열시켰습니다. 이때의 도형들은 어떤 부모 그룹에도 속하지 않는 자유로운 상태입니다.  
   1-2. 이후 회전이 발생하는 순간, 회전하는 도형과 고정된 도형을 구분하여 동적으로 두 개의 부모 그룹을 생성했습니다.

2. 그룹의 상위 그룹을 만들어 한 번 더 감쌌습니다.  
    2-1. 회전, 고정 두 개의 그룹으로 나뉘어진 상태에서 회전하는 그룹에 또 한번 그룹을 지정했습니다.  
    (이 그룹을 최상위 회전 그룹이라 부르며, 1-2 에서 생성된 그룹을 하위 회전 그룹이라 부르겠습니다. )  
    2-2. 최상위 회전 그룹의 위치를 원하는 회전의 시작점 위치로 복사했습니다.  
    (이를 통하여 회전의 시작점을 원하는 위치로 설정할 수 있게 되었습니다.)  
    2-3. 하위 회전 그룹의 위치를 2-2에서 설정한 위치의 반대 방향으로 이동시킵니다.  
    이러한 과정을 통하여 최상위 회전 그룹과 하위 회전 그룹은 서로 상대적인 위치를 갖게 되며, 최상위 회전 그룹을 회전 시키면 의도하던 회전 동작을 수행할 수 있게 되었습니다.

3. 회전이 끝난 시점에 최상위 회전 그룹을 해제하여, 1-1의 상태로 도형들을 되돌리고, 화면에 보여주었습니다.

<details>
  <summary>2-3. 관련 내용 첨부 사진</summary>
  <table>
    <tr>
      <th>
        <img width="100%" height="300px" src="https://github.com/user-attachments/assets/fb1cfa5a-8968-46d4-b8ce-571f73a7a4f2" />
      </th>
      <th>
        <img width="100%" height="300px" src="https://github.com/user-attachments/assets/24821a73-3ad4-4651-acbb-cffacf8d7821" />
      </th>
    </tr>
    <tr>
      <td align="center">
        1-1 관련 내용
      </td>
      <td align="center">
        1-2 관련 내용
      </td>
    </tr>
    </table>
    <table>
      <tr>
        <img width="100%" src="https://github.com/user-attachments/assets/cfdfe2e8-5363-4734-b0da-318414845b45" />
      </tr>
      <td align="center">
        2 관련 내용
      </td>
  </table>
</details>

## 3. 어떻게 충돌을 감지할 수 있을까?

Three.js에서 충돌을 구현하려면 생성된 도형들이 맞닿았을 때 충돌이라고 인식하도록 별도로 이벤트를 설정해 줘야 합니다.  
Three.js에서는 별도로 충돌을 감지하는 라이브러리는 존재하지 않기 때문에, 물리 엔진인 Ammo.js나 Cannon.js를 통해 구현하거나 함수로 충돌을 직접 구현해야만 했습니다.

<img width="40%" alt="충돌 시각화" src="https://github.com/user-attachments/assets/5da77981-95a8-4cb8-a319-87615c103347" />

충돌 감지는 이 프로젝트에서 핵심적인 기능이라고 판단했기 때문에 물리 엔진을 사용해서 구현하는 것보다는 함수로 충돌을 구현하는 것이  
도전적인 요소라고 판단하여 직접 구현하기로 결정했습니다.

<br>

Three.js에서는 크게 `BoundingBox`, `Raycasting`, `Vertex(꼭짓점)` 이 세 가지 방법을 통해서 두 물체 간의 거리를 감지합니다.  
정해놓은 수치만큼 두 물체가 가까워지면 충돌이 되었다고 판단하게 할 수 있습니다.

> `BoundingBox` : 생성된 도형을 사각형으로 둘러싸고 사각형이 무언가에 닿았을 때 감지되는 방식
>
> `Raycasting` : 생성된 도형을 기준으로 모든 방향에 광선을 쏘아서 그 광선이 무언가에 닿았을 때 감지되는 방식
>
> `Vertex` : 도형을 생성할 때 정해 놓은 꼭짓점이 서로 닿았을 때 감지되는 방식

### 3-1. BoundingBox를 활용한 충돌 감지

처음에는 BoundingBox를 선택했습니다. 먼저 회전하는 삼각 도형과 회전하지 않는 삼각 도형에 BoundingBox를 계산합니다.  
그리고 회전하는 삼각 도형의 마지막 회전이 회전하지 않는 삼각 도형의 BoundingBox와 닿게 된다면 충돌로 인식하게 하였습니다.

<details>
<summary>삼각도형의 BoundingBox 계산</summary>
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

BoundingBox만 계산할 경우 충돌로 인식하는 거리를 조절하지 못하기 때문에 거리를 조절할 수 있는 방법을 찾아야 했습니다.  
그래서 BoundingBox 상위에 또다른 BoundingBox를 만들어서 임의의 수치(입력 값)를 통해 상위의 BoundingBox의 크기를 정하고,  
임의의 수치(입력 값) 조정을 통해 가까이 또는 멀리 감지하는 것을 조절할 수 있게 했습니다.

<details>
<summary>BoundingBox 충돌 거리 조정 추가 코드</summary>
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

아래 이미지를 통해서 기존 BoundingBox가 상위에 생긴 BoundingBox가 어떻게 충돌을 감지하는지 알 수 있습니다.
점선으로 이루어진 사각형이 BoundingBox 상위에 만들어진 또다른 BoundingBox입니다. 이것을 통해 충돌을 감지합니다.

<img width="50%" alt="바운딩 박스 시각화" src="https://github.com/user-attachments/assets/bc24947a-c6bc-40d4-9def-e622741d1a32" />

<br>

상위의 BoundingBox가 가장 민감하게 충돌을 감지하는 거리는 상위의 BoundingBox 크기와 상관없이 기존 BoundingBox가 겹치면 발생합니다.  
진행하고 있는 프로젝트 전체 도형은 여러 개의 삼각 도형들이 처음부터 붙어 있고, 또 회전하는 삼각 도형도 회전하지 않는 삼각 도형과 붙어 있는 상태에서 회전하기 때문에  
처음부터 BoundingBox가 겹쳐 있습니다. 그래서 어떤 방향으로 회전을 시켜도 충돌로 인식하게 됩니다.

<img width="80%" alt="바운딩 박스 회전 충돌" src="https://github.com/user-attachments/assets/ebc514ad-bd4d-49c4-8845-ee1476fd2cb9" />
<img width="70%" alt="바운딩 박스 회전 충돌 콘솔" src="https://github.com/user-attachments/assets/54e319bc-1625-4eb6-95c3-0f312ceacbda" />

<br>

회전 전에는 충돌 감지 함수가 실행되지 않기 때문에 BoundingBox가 겹쳐 있어도 충돌로 인식하지 않습니다.  
그러나 회전이 완료된 후에는 충돌 감지 함수가 실행되기 때문에 삼각 도형을 한 바퀴 회전시켜 원래 모양을 그대로 유지해도 충돌을 감지하게 됩니다.

이 또한 BoundingBox가 처음부터 겹쳐 있기 때문에 발생하는 문제입니다.

해당 문제를 인식한 후 BoundingBox로 충돌을 인식하는 것은 이 프로젝트에 적합하지 않다고 판단하여 Raycaster 방식으로 방법을 전환하여 진행하였습니다.

<img width="80%" alt="바운딩 제자리 회전 충돌" src="https://github.com/user-attachments/assets/a278469a-212d-4c4b-a32c-224ed461bee8" />
<img width="70%" alt="바운딩 충돌 콘솔 2" src="https://github.com/user-attachments/assets/f48e856f-9aa2-4a89-b258-b8f5c7fe0cf6" />

### 3-2. Raycaster를 활용한 충돌 감지

두 번째로 시도한 방법은 Raycaster입니다. 이전 BoundingBox는 삼각 도형 겉으로 박스를 생성해 감지했다면, Raycaster는 회전하는 삼각 도형에서 여러 방향으로 광선을 발사합니다.  
그 광선이 회전하지 않는 삼각 도형에 닿게 되었을 때 충돌을 감지하도록 설정하였습니다.

`intersects[0].distance`는 회전하는 삼각 도형에서 발사한 광선이 회전하지 않는 삼각 도형에 처음으로 닿는 지점까지의 거리를 나타냅니다.  
이 거리가 충돌로 인식하는 거리보다 작다면 충돌로 인식하게 됩니다.

<details>
<summary>Raycaster 충돌 감지 코드</summary>
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

<img width="50%" alt="레이케스터 시각화" src="https://github.com/user-attachments/assets/3a9a5c6c-7cdf-49a9-96cb-075ea68b0ae9" />

<br>

Raycaster에서 이전에 발생하던 문제들은 나타나지 않았으나, 가장 중요한 부분에서 문제가 발생했습니다.  
전체 도형의 구조 특성상 서로 포개지는 모양을 만들 수 있는데, 이 모양을 만들게 되면 충돌로 인식하게 되었습니다.  
이는 서로 포개지는 모양이 되었을 때 면과 면이 닿는 순간 광선이 닿기 때문에 그렇습니다.

충돌로 인식하는 거리를 조절 해봤지만, 면과 면이 닿았을 때는 이미 충돌로 인식하는 거리보다 가까운 상태가 되기 때문에 수치 조정은 의미가 없었습니다.

[참고] 서로 포개지는 모양  
아래 빨간색으로 강조된 원을 본다면 레이케스터가 어떻게 광선을 발사해 충돌을 감지하는지 알기 쉽습니다.  
<img width="60%" alt="서로 포개지는 모양" src="https://github.com/user-attachments/assets/c0f3cbcb-8a41-437c-bb48-a42ec3efaa78" />

<img width="80%" alt="레이케스터 충돌 오류" src="https://github.com/user-attachments/assets/23cf3e86-c549-4d39-96c0-1bdca9a08071" />
<img width="40%" alt="레이케스터 충돌 콘솔" src="https://github.com/user-attachments/assets/c5b50820-6d13-4589-a8f8-221635b18a23" />

<br>

Raycaster를 사용하면 서로 포개지는 부분을 계속 충돌로 인식하기 때문에 이 프로젝트에는 적합하지 않다고 판단하여,  
Vertex를 통해 중심점을 구하고 중심점의 거리 간격을 통해 충돌을 감지하는 방법으로 전환하였습니다.

### 3-3. Vertex(꼭짓점)와 Center를 활용한 충돌 감지

Vertex(꼭짓점)들을 구하여 Vertex(꼭짓점)들이 닿는 거리를 기준으로 충돌을 인식하게 됩니다. 더욱 세밀하게 충돌 거리를 조절할 수 있는 방법입니다.

<details>
<summary>삼각도형의 Vertex 계산 코드</summary>
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

아래 이미지를 통해 Vertex가 어떤 식으로 충돌을 감지하는지 알 수 있습니다.

<img width="50%" alt="버텍스 시각화" src="https://github.com/user-attachments/assets/6c3418fb-1799-4864-8b48-38c85d66b2d6" />

Vertex도 처음에는 문제가 없을 거라 판단했으나 BoundingBox처럼 Vertex이 이미 닿아 있는 도형들이 있기 때문에 정상적으로 충돌을 감지하기는 불가능했습니다.

서로 포개지는 모양처럼 선 또는 면들이 닿았을 때도 충돌로 인식하지 않는 방법이 무엇이 있을까 고민했을 때, Vertex들의 위치를 모두 더하여 Vertex의 수만큼 나누고  
Vertex의 평균 위치를 구하면 될 것이라 판단했습니다. 즉, 이 방법은 삼각 도형의 중심점을 구하는 방법입니다.

<details>
<summary>Vertex를 통해 중심점 계산 코드</summary>
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

아래 이미지를 통해 Vertex로 구한 중심점의 위치가 어디에 있는지 알 수 있습니다.

<img width="50%" alt="버텍스 센터 시각화" src="https://github.com/user-attachments/assets/120df54a-f3d3-4789-9f31-ef961e2d0d84" />

회전하는 삼각 도형의 중심점과 회전하지 않는 삼각 도형의 중심점의 거리가 충돌로 인식하는 거리보다 작게 되면 충돌로 인식하도록 설정했습니다.  
그리고 충돌로 인식하는 거리는 테스트를 통해 삼각 도형이 서로 겹치면 충돌로 인식하지만 선 또는 면이 닿았을 때는 충돌로 인식하지 않도록 수치를 설정했습니다.

최종적으로 위 방법을 통해 충돌 감지 함수를 구현했을 때, 서로 포개지는 모양에서도 충돌로 인식하지 않고 잘 작동하는 것을 확인했습니다.

<img width="80%" alt="최종 정상 작동" src="https://github.com/user-attachments/assets/1760a914-a292-4a27-a393-cff3350f522a" />
<img width="50%" alt="최종 정상 작동 콘솔" src="https://github.com/user-attachments/assets/e66f229e-82dd-4fcd-a65b-9db228622261" />

<br>

서로 포개지는 모양이 되었을 때, 거리가 충돌로 인식하는 거리(1.55)보다 크기 때문에 충돌로 인식하지 않고 정상적으로 작동하고 있습니다.  
또 서로 포개지는 모양처럼 문제가 될 것 같은 모양들을 테스트해보았을 때도 문제없이 작동하는 것을 확인했습니다.

[참고] 정상적으로 충돌을 감지하는 모습 1
<img width="80%" alt="최종 정상 충돌감지 1" src="https://github.com/user-attachments/assets/a9fa7284-a454-4b1e-999b-2560b7f14a54" />

[참고] 정상적으로 충돌을 감지하는 모습 2
<img width="80%" alt="최종 정상 충돌감지 2" src="https://github.com/user-attachments/assets/193c82af-df9d-447b-bd16-808011311f30" />


## 4. 이미지 저장 기능 구현하기
사용자가 만든 척척이를 다른 사람에게 공유할 수 있는 기능을 구현하려고 했습니다. 고려한 방식엔 두 가지가 있었습니다.

**1. 링크로 공유하기**

현재 이 프로젝트에는 별도의 데이터 베이스가 존재하지 않기 때문에 링크 자체에 데이터를 포함하는 방식을 선택했습니다. 전역 상태에 저장되는 척척이의 좌표를 링크 데이터에 저장했습니다.

하지만 캔버스에 있는 도형들의 좌표 데이터는 정수로 떨어지지 않고 매우 긴 소수점을 가지는 경우도 있었습니다. 이러다 보니 링크가 지나치게 길어져 웹에서 로딩되지 않는 문제가 발생했습니다. 링크 길이를 줄이기 위해 여러 가지 방법을 시도해 봤지만, 명확하게 해결되지 않아 다른 방법을 고려하기로 했습니다.

**2. 이미지를 저장하여 공유하기**

이미지로 저장하면 링크 없이도 사용자가 원하는 곳에 바로 업로드 하고 공유할 수 있어, 시각적으로 즉시 확인할 수 있다는 장점이 있습니다. 또한 링크를 공유하는 방식처럼 환경이 한정되지 않기 때문에 더 좋은 접근이 될 수 있을 것이라 생각했습니다.

### 4-1. 캔버스 정보 가져오기
캔버스에 그려진 내용을 이미지로 저장하려면 현재 캔버스와 그 위에 그려진 도형들의 정보를 가져와야 합니다. 하지만 단순히 `<canvas>` 요소 자체를 가지고 오는 것만으로는 해결되지 않았습니다.

만약 캔버스 자체만 가지고 오게 된다면 아무것도 뜨지 않는 흰 화면을 보게 됩니다. 그렇기 때문에 캔버스 안에 `camera`나 `scene`과 같은 요소를 강제적으로 렌더링 해야 한다고 판단했습니다.

| ![Image](https://github.com/user-attachments/assets/3f0f3ff5-8518-4c87-b2ac-2a43ad8cb97e) | ![Image](https://github.com/user-attachments/assets/2a10aaeb-4323-4f6b-9275-da9b932146e6) |
| --- | --- |
| 렌더링 전 이미지: 빈 화면만 출력 | 렌더링 후 이미지: 캔버스 위 도형 출력 |

사용자가 저장 버튼을 클릭하면 최신 상태의 캔버스를 렌더링한 후 이미지로 변환할 수 있도록 설계했습니다.

### 4-2. Blob 객체를  활용한 이미지 저장

HTML5의 `canvas` 요소는 캔버스 데이터를 이미지로 변환할 수 있도록 메서드를 지원합니다. `toDataURL()`과 `toBlob()` 두 가지 방식이 있습니다.

**📌 toDataURL() vs toBlob() 비교**


| 기능          | `toDataURL()`     | `toBlob()`                         |
| ----------- | ----------------- | ---------------------------------- |
| **출력 형식**   | Base64 문자열        | Blob 객체 (바이너리)                     |
| **파일 크기**   | 원본보다 커짐       | 원본 크기 그대로                          |
| **속도**      | 느림 (동기 실행)        | 빠름 (비동기 실행)                        |
| **메모리 사용량** | 높음 (Base64 변환 필요) | 낮음 (원본 유지)                         |
| **UI 반응성**  | 크기가 클수록 UI 멈춤     | 비동기 처리로 UI 영향 없음                   |
| **다운로드**    | 별도 변환 필요          | `URL.createObjectURL(blob)`로 바로 가능 |


`toDataURL()` 형식의 경우 Base64 인코딩 방식이기 때문에 바이너리 데이터를 문자열로 변환하며 3바이트 데이터를 4바이트 문자열로 변환하게 됩니다. 이때 실제 파일 크기보다 커지는 상황이 발생합니다. 이떄문에 만약 파일이 커지게 된다면 UI가 멈추는 문제가 발생할 수 있습니다.

반면 `toBlob()`의 경우 이진(Binary) 데이터를 저장하는 객체이며, 원본 크기가 그대로 유지됩니다. 또한 비동기로 동작하기 때문에 UI가 멈추는 문제를 예방할 수 있습니다. 이러한 이유로 `toBlob()` 형태를 활용해 데이터를 URL로 변환시켰습니다.

> **Blob(Binary Large Object) 객체란?**
> 
> 텍스트나 이미지, 오디오, 비디오 같은 대용량의 바이너리 데이터를 저장할 수 있는 객체로, 서버에 업로드할 때 데이터는 문자열(String)이 아니라 이진(Binary) 데이터로 다뤄진다.

이미지를 저장하기 위해서 `a` 태그의 `download` 속성을 활용했습니다. `download` 속성은 별도의 추가 작업 없이 파일을 저장할 수 있습니다. 브라우저는 href 속성에 지정된 Blob URL을 확인한 후, 메모리에서 해당 데이터를 불러오고 운영체제의 파일 시스템 API를 호출하여 파일을 다운로드 폴더에 저장합니다.

이러한 과정을 통해 이미지 저장 기능을 구현했습니다.

# 프로젝트 문서화 및 공통 용어 정의를 통한 협업 개선

프로젝트를 진행하며 다른 팀원의 의견을 개인의 관점에서 해석하여 서로의 의도를 명확히 이해하지 못 하는 경험을 했습니다. 이러한 문제로 인해 회의 시간이 길어지거나, 제대로 된 소통이 되지 않는 등의 문제가 발생했습니다. 

프로젝트를 원활하게 진행하기 위해 이 문제점을 해결해야 할 필요성을 느끼고 크게 세 가지 방식을 도입했습니다.

1. 주기적인 회의 진행 및 기록
2. 회의록, 이슈 기록 등의 문서 템플릿 생성
3. 팀 내 공통 용어 정의

## 1. 주기적인 회의 진행 및 기록

기존에는 회의 시간을 정해 두지 않고 구두로 진행하였습니다. 이 방식의 문제점은 서로의 소통이 부족해진다는 것입니다. 소통이 부족해짐으로써 서로의 상황에 대해 알 수 없게 됩니다. 또한 기록을 해 두지 않으니 회의 내용을 서로 다르게 기억하는 경우가 생기고, 이로 인해 동일한 내용을 반복해야 하는 문제가 발생했습니다.

 문제를 해결하기 위해 하루에 두 번, 오전과 오후로 나누어 정기적인 회의를 진행했습니다. 오전 회의에서는 전날 밤에 추가로 진행한 작업과 당일에 해야 할 작업에 관한 내용을 공유했습니다. 오후 회의에서는 코드를 작성하며 발생한 문제점에 대해 논의하고, 팀 프로젝트 진행 방향에 대한 회고를 KPT 형식으로 진행했습니다.

| ![회의록](https://github.com/user-attachments/assets/461473f1-2e54-4bd2-a2ad-93af0f464235) |
| --------------------------------------------------------------------------------------- |
| 회의록 일부 발췌                                                                               |


정해진 시간에 회의를 진행함으로써 팀원들 간의 소통 빈도가 증가했습니다. 기존 방식에서는 하루에 팀원 모두가 함께 소통하는 횟수가 두 번 이하였다면, 주기적인 회의를 통해 두 번을 필수이고, 이후에 다른 문제점에 대해서 따로 소통하며 평균 세 번 이상이 되었습니다. 또한 회의록 작성을 통해 회의에 대한 팀원 간 서로 다른 기억을 방지할 수 있었습니다.

## 2. 문서 작성 템플릿 생성
회의를 주기적으로 진행하게 됨으로 인해 회의록 작성의 빈도가 늘었습니다. 팀원 모두가 돌아가며 회의록을 작성하게 되니 서로가 중요하게 생각하는 부분이 달라 작성하는 내용이 달라 정보의 통일성이 없다고 느끼게 되었습니다. 또한 각자 작성한 희의록에 중점이 달라 내용을 정리하는 것에 시간이 소모되었습니다.

문제를 해결하기 위해 회의록을 작성할 때 정해진 서식을 만들게 되었습니다. 회의록 작성 시 문서의 형식을 안건과 결론으로 구분했습니다. 안건은 발생한 문제와 이에 대한 다양한 의견 등을 기록했으며, 결론에는 논의된 결과에 대해 작성했습니다. 

| ![문서양식_안건](https://github.com/user-attachments/assets/d118aebd-6665-45cd-9dc5-3193387c1756) | ![문서양식_결론](https://github.com/user-attachments/assets/d0a452bd-091a-4d0b-a3c7-a2a4fbd8c519) |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 안건 양식 예시                                                                                    | 결론 양식 예시                                                                                    |


이러한 방식을 통해 회의록을 정리하는 데 소모되던 삼십 분에서 한 시간 이내의 시간을 줄일 수 있었습니다. 다른 팀원이 작성한 회의록의 맥락도 보다 수월하게 파악할 수 있게 되었습니다.

## 3. 팀 내 공통 용어 정의

3D 작업의 경우 동일한 단어이더라도 해석의 여지가 많기 때문에 서로 다르게 이해하는 상황이 발생하는 경우가 있었습니다. 이러한 문제는 팀원 간의 소통에서 혼란을 주며, 프로젝트 진행에 큰 차질을 주게 되었습니다.

문제를 해결하기 위해 팀 내부에서 공통으로 이해할 수 있는 용어를 정의했습니다. 예를 들어 척척이의 요소가 되는 “삼각 도형 하나”를 “척”이라는 간략한 단어로 통일함으로써 작업 중 혼란을 줄이고 효율성을 높이고자 했습니다.

| [![단어_통일하기](https://github.com/user-attachments/assets/ce3d2bb5-2e7c-400e-911c-0857c2824372)](https://github.com/user-attachments/assets/ce3d2bb5-2e7c-400e-911c-0857c2824372) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 회의 내용 일부 발췌                                                                                                                                                                    |


이렇게 정해진 용어는 대화를 진행할 때 팀원 간의 빠른 이해와 소통을 도왔습니다. 

## 팀 회의록 링크

| <img width="200" alt="회의록" src="https://github.com/user-attachments/assets/9851c2be-0d11-44ad-89e9-f3c2ef51dca0" /> | <img width="200" alt="칸반_태스크" src="https://github.com/user-attachments/assets/d2598442-aaee-4879-8c7e-ece154e13885" />     | <img width="200" alt="이슈_기록" src="https://github.com/user-attachments/assets/c3adf3b7-5ee9-4942-86c5-5ca12db89d88" /> |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [회의록](https://balsam-ceramic-da1.notion.site/1297aad7a2ea819ea182d08d848f463c?pvs=4)                                | [칸반 태스크 캘린더](https://www.notion.so/Chuck-Chuck-1297aad7a2ea8054bc6cf050c979133c?pvs=4#1297aad7a2ea810c9020c322c1573833) | [이슈 기록 페이지](https://balsam-ceramic-da1.notion.site/1337aad7a2ea8016972ff891dea5c6b2?pvs=4)                         |

# 개인 회고

## 정민지

척척이 프로젝트를 진행하며 three.js를 처음 접해 보고 3D를 다루는 과정을 경험했습니다. 웹 개발을 배우는 동안 2D의 공간에서만 작업하다 3D 작업을 진행하게 되니 좌표에 따라 달라지는 회전의 각을 구하거나 면이 맞물리게 회전시키는 등 저희의 한계를 시험하는 기술적 챌린지가 많았습니다.

이러한 어려움을 극복하는 과정에서 예상치 못한 난관을 겪으며 좌절을 경험하기도 했지만, 팀원들과 서로의 지식을 공유하고 함께 헤쳐 나가는 과정에서 문제를 해결하고 극복하는 경험도 할 수 있었습니다.

[정민지 개인 Github](https://github.com/miinje)

## 홍성남

척척이 프로젝트는 저에게 매 순간이 도전이며 의미가 깊은 프로젝트였습니다. 개발 공부를 시작한 이후 처음 진행한 프로젝트임과 동시에 처음 팀으로써 진행한 프로젝트이기도 합니다.
처음으로 써보는 3D 라이브러리를 사용하여 직접 점선면을 계산해 도형을 만드는 것, 위치에 따라 변화하는 회전축 기울기를 계산하는 것, 우리를 가장 힘들게 한 여러 도형의 회전을 관리하는 것 등 어느 하나 쉬운 것 없이 기술적인 어려움을 맞닥뜨린 프로젝트였습니다.

이 과정들 속 매번 기술적 어려움을 마주할 때마다 내가 이걸 해낼 수 있을까란 막연함이 찾아왔지만, 새로운 개념에 대해 학습하고 이 지식을 팀원들과 공유하는 시간을 통해 혼자서는 생각해 내지 못했을 창의적인 해답들을 찾아 낼수 있게 되었습니다.
한 달이라는 짧은 시간 동안 새로운 것을 학습하고 적용하는 방법, 더하여 팀으로 소통하고 협업하는 방식을 경험할 수 있어 의미가 깊었고, 매번 힘이 되어준 척하면척 팀원분들에게 다시 한번 감사드립니다!!

[홍성남 개인 Github](https://github.com/Seongnam-si)

## 김동현

이 프로젝트 후기를 한 단어로 표현한다면 롤러코스터라고 할 수 있을 것 같다.
그만큼 우여곡절도 많았고 좋은 경험도 많았다라고 볼 수 있다.
처음 프로젝트를 시작할 때는 걱정과 설렘이 공존했다. 아직도 코딩이 어려운데 프로젝트를 해도 되는 걸까? 라는 걱정과 팀으로 힘을 합쳐 무언가를 만든다는 것이 도파민이 뿜어져 나오게 했다.

팀 프로젝트의 가장 큰 장점은 나와 성격이 다른, 생각하는 방식이 다른 사람들이 모여서 생각하는 방향을 일치시키려고 노력한다는 것이다. 의견을 어필하기 위해 설득을 하고 때로는 설득을 당하기도 하면서 조율을 배울 수 있다. 누군가가 봤을 때는 적당히 수용하고 넘어가면 되는 거 아니야? 라고 할 수도 있지만 자신에게 정말 중요한 일이라면 쉽게 넘길 수는 없을 것이다.

결론적으로 이번 프로젝트를 통해 상대방의 의견을 좀 더 깊이 이해하는 방법을 조금이나마 알게 된 것 같다. 그리고 혼자서는 불가능한 것이지만 서로 부족한 점을 채워주며 완성할 수 있다는 경험은 두고두고 좋은 기억으로 남을 것 같다.

[김동현 개인 Github](https://github.com/Frogman113)
