# Article Genie

![image](https://user-images.githubusercontent.com/41819129/174421184-2e0c71e5-23d6-44fb-8601-209db83234ad.png)

[Article Genie - Web Article Reading Helper | Make Your Own Notes](https://www.articlegenie.co/)

## 🙇‍♂️ **Introduction**

**Highlight your thoughts reading web articles, and make your own notes out of it.**

아티클 지니는 웹 문서를 읽고 요약하는 유저의 생산성을 높여주는 SaaS(**Software as a Service)** 입니다.

사용자는 아티클 지니를 통해 웹 문서에 대한 몰입도를 높이고, 서로 다른 웹 문서에서 필요한 정보만 선택해 자신만의 요약노트로 만들어 저장하고 관리할 수 있습니다.

웹 문서에서 특정 문단을 선택하면, 클릭 한 번에 내용을 복사해 작성하던 요약노트에 붙여 넣을 수 있습니다. 또한 붙여 넣은 텍스트를 클릭하면 다시 출처 페이지로 간편하게 이동할 수 있습니다.

## 💡 Motivation

개발을 시작하면서 구글링을 통해 웹 문서를 탐색하는 일이 많아졌습니다.

그러나 문서의 양이 많을수록 집중해서 읽기 어려웠고 동기들과 유용한 reference를 공유할 때에도 특정 부분을 지정해서 공유할 수 없다는 아쉬움이 있었습니다.

또한 필요한 내용을 드래그하여 복사 붙여넣기 하는 과정, 그리고 그 내용의 출처를 매번 저장하는 과정에서 다소 피로하다는 느낌을 받을 수 있었습니다.

**따라서 저희는 웹 문서 탐색에 대한 몰입도와 생산성을 높여줄 수 있는 SaaS를 고안하게 되었고 아티클 지니를 제작하게 되었습니다.**

## 🗓 Schedule

[2022.05.30 ~ 2022.06.17](https://www.notion.so/796c2e121fee463fa8207484739c8d20) – 3 weeks

## 💿 Feature

- **웹 문서 읽을 때 몰입도를 높여줍니다.**

  - 웹 페이지의 URL을 입력하면 해당 웹 페이지에 아티클 지니의 기능을 적용하여 이용 가능
  - 사용자가 읽고 있는 부분(마우스 위치)을 이용하여 해당 문단에 하이라이트 기능 적용
  - 페이지의 내부 링크 클릭 시 새로 열리는 페이지도 아티클 지니가 적용되는 기능
    ![01-show-highlight](https://user-images.githubusercontent.com/41819129/174421338-1bf9cb95-a2fe-4760-8a59-4cbe2df7127b.gif)

- **웹 문서의 특정 문단을 강조하여 다른 사용자와 공유할 수 있습니다.**

  - 특정 문단에 딥링크를 생성할 수 있으며 공유된 URL로 접근 시 해당 페이지의 해당 문단으로 스크롤 및 하이라이트 되는 기능

- **웹 문서에서 필요한 정보만 선택해 자신만의 요약노트 만들 수 있습니다.**

  - 필요한 내용을 정리할 수 있는 아티클을 생성하고 목록으로 관리하는 기능
  - 특정 문단을 선택하고 메모 버튼을 클릭하면, 열려있는 아티클로 해당 문단이 붙여넣기 기능
  - 마이 아티클 페이지에서 특정 아티클을 클릭 시 마지막 방문한 페이지에서 해당 아티클을 작성할 수 있는 기능
  - 저장된 아티클을 PDF로 변환하여 저장하거나 인쇄할 수 있는 기능
    ![02-create-my-notes](https://user-images.githubusercontent.com/41819129/174421361-34f33011-4e23-4428-a1c9-7efd85aad0c8.gif)

- **요약한 노트의 특정 문단의 출처를 알 수 있습니다.**
  - 아티클에서 붙여넣기한 문단을 클릭하면, 출처 페이지로 이동 및 해당 문단으로 스크롤 및 하이라이트 되는 기능
    ![03-hostname-preview-1](https://user-images.githubusercontent.com/41819129/174421365-71e61f3d-673d-4923-a729-4007f6804a0d.gif)
    ![03-hostname-preview-2](https://user-images.githubusercontent.com/41819129/174421369-9152ef89-a57a-46d3-933f-7f03a19d5af3.gif)

## 🌏 Service Architecture

![image](https://user-images.githubusercontent.com/41819129/174421506-692821a1-3ec0-4cf2-9c3b-d31df8ed218a.png)
![image](https://user-images.githubusercontent.com/41819129/174421513-77c3db84-35e9-451e-b453-dd0e6f705b35.png)

## 📁 **Installation**

### Frontend (NextJS)

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어 입력

```jsx
npm install

npm start
```

2. 환경설정 (.env file)을 아래와 같이 입력해야 합니다.

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
NEXT_PUBLIC_SERVER_URL=<YOUR_SERVER_URL>
NEXT_PUBLIC_HOST_URL=<YOUR_CLIENT_URL>
```

### Backend (Express)

1. 프로젝트를 다운 받은 후 프로젝트 디렉토리 내부에서 다음 명령어 입력

```jsx
npm install

npm start
```

2. 환경설정 (.env file)을 아래와 같이 입력해야 합니다.

```bash
MONGODB_URI=<YOUR_MONGODB_DATABASE_URL>
JWT_SECRET=<YOUR_JWT_TOKEN_SECRET>
```

## 🏔 Challenge

### 원본 페이지에 추가 기능 적용을 위한 DOM 조작

원본 페이지에 저희 기능을 적용하려면 해당 페이지의 HTML 을 조작하는 과정이 필요했습니다. 따라서 특정 페이지에서 응답받은 HTML 을 cheerio 라이브러리로 parsing 하고 target tag 들을 선택해 필요한 스타일을 입힐 수 있었습니다. 또한 각 태그 별로 id 값을 부여해서 저희가 구현한 로직으로 `딥링크 생성` 및 `출처 찾아가기` 기능을 구현할 수 있었습니다.

### 원본 페이지 리소스 요청 이슈

서비스 내에서 원본 페이지와 동일한 형태를 보여주기 위해 필요한 CSS, JS 파일을 불러오지 못하는 문제가 있었습니다. 그리고 그 원인은 원본 페이지의 리소스를 요청할 때 경로가 절대경로가 아닌 상대경로라서 발생하는 문제라는 것을 찾았고, 이를 해결하기 위해 `Link` 와 `script` 태그에 설정된 상대경로 대신 source domain 으로 수정해서 성공적으로 원본 페이지의 리소스를 불러올 수 있었습니다.

### hydration 이슈

React 에서 Next.js 로 migration 하면서 기존 컴포넌트를 옮겼을 때, server side 에서 만든 HTML 과 초기 렌더링 시에 React 에서 진행하는 hydration 과정에서 render tree가 일치하지 않아서 hydration 에러가 발생했습니다. 그 원인이 컴포넌트의 state 가 초기 렌더링이 완료되기 전에 DOM 에 영향을 미치기 때문인 것을 발견했고, 이를 해결하기 위해 해당 컴포넌트에서 초기 렌더링 이후에 DOM 이 변경될 수 있도록 `useEffect` 를 활용했습니다.

### 새로운 stack 도입

- 로그인 상태와 각종 컴포넌트의 상태를 동기화하기 위해서 전역 상태 관리 라이브러리는 반드시 필요했습니다. 기존에 사용해본 Redux 의 보일러 플레이팅보다 좀 더 간결한 코드와 폴더 구조, 그리고 간편한 사용성을 가진 Recoil을 도입했습니다. 특히, 이번 프로젝트에서는 Recoil 덕분에 웹 페이지의 모달을 global 컴포넌트로 관리해서 재사용성을 높이고, 더 명시적인 코드로 모달을 활용할 수 있었습니다.
- React Query 를 사용하면서 기존에 분기 처리를 통해 렌더링 했던 로딩과 에러 컴포넌트를 리액트 최신 기능인 Suspense 와 Error Boundary 로 대체할 수 있었으며 이를 통해 로딩과 에러를 선언적으로 처리할 수 있었습니다.
  → 모달 컴포넌트는 Portal 을 이용하여 root 단에서 렌더링 되기 때문에 Suspense 와 Error Boundary 를 최상단으로 올려주어야 모달에 적용이 가능했습니다. 그러나 최상단에만 적용할 경우 로딩 시 크게 깜빡이는 현상으로 사용자 경험이 떨어지는 것을 발견했고, 이를 통해 최상단의 Suspense 와 Error Boundary 에 의해 하위에 존재하는 모든 컴포넌트가 영향을 받는다는 사실를 알 수 있었습니다. 때문에 에러나 로딩이 발생할 수 있는 로직에 근접하게 적용하는 것이 최적화에 유리하다는 것을 알 수 있었습니다.

## 🎖 Migration

### Migration 이유

원본 페이지를 공유할 때의 사용자의 경험을 동일하게 유지하기 위해 SSR 활용이 필요했음

- 페이지 링크 공유 시 원본 페이지를 그대로 공유할 때와 동일한 썸네일과 미리 보기를 표시
  → CSR 로 렌더링 할 경우 불가능
- SEO 최적화를 위해 SSR 을 사용하는 웹 페이지의 특성을 그대로 유지
- next/head를 이용하여 meta 태그 관리에 용이

### Monolithic Architecture vs Micro Architecture

기존에 Next.js 의 API Routes 를 활용해 Monolithic 구조로 migration 을 하고 작업을 진행했지만 서버와 클라이언트 코드가 한 저장소에 존재했기 때문에 작업 진행이 blocking 되는 상황이 많아졌습니다. 또한 **프론트엔드와 백엔드를 분리하는 Micro 구조가 서비스의 Scale-out 에 더 적합하다고 판단해서** 기존의 express endpoint 를 다시 활용하기로 결정했습니다.

### 프론트 서버의 역할 확대

- 변경 전: 메인기능을 백엔드 서버에 요청하여 조작된 HTML, 스크립트 파일을 받아 구현
- 변경 후: 메인기능을 Migration 이후 프론트 서버에서 해당 작업을 진행

## 📚 Stack

### Frontend

- ES6+
- NextJS
- React Query (Sever state)
- Recoil (Client state)
- Styled Compontents
- Jest

### Backend

- Node.js
- Express
- Access Token을 이용한 JWT authorization
- MongoDB - Atlas
- Mongoose
- Mocha, Chai

## 😃 개발자 소개

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/taewanseoul">
        <img src=".github/taewan-avatar.png" alt="임태완 프로필" width="200px" height="200px" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/KimJunhyeong1">
      <img src=".github/jun-avatar-resized.png" alt="김준형 프로필" width="200px" height="200px" />
    </td>
    <td align="center">
      <a href="https://github.com/changyun-go">
        <img src=".github/go-avatar-resized.png" alt="고창윤 프로필" width="200px" height="200px"/>
      </a>
    </td>
  </tr>
  <tr>
    <td>
    <ul>  
      <li><a href="https://github.com/taewanseoul">Taewan Lim 임태완</a></li>  
		<li>taewan.seoul@gmail.com</li>  
	</ul>
    </td>
    <td>
    <ul>  
      <li><a href="https://github.com/KimJunhyeong1">Junehyeong Kim 김준형</a></li>  
		<li>khm11904@gmail.com</li>  
	</ul>
    </td>
    <td>
    <ul>  
      <li><a href="https://github.com/changyun-go">Changyun Go 고창윤</a></li>  
		<li>aeiou75three@gmail.com</li>  
	</ul>
    </td>
  </tr>
</table>
