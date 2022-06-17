# Nx2-bp
프론트엔드 템플릿 - React, TS

## 설치하기

### npx로 설치
> 나중에

### 프로젝트 클론
* 클론
``` cmd
$ git clone http://gitea.wizcore.loc/wilab/nx2-bp
```
* 깃 초기화
```
$ rm -rf .git
$ git init
$ git add . 
$ git commit -m "create template"
```
* 패키지 설치
```
yarn
```
* 프로젝트 설정
    - `package.json` 파일 `name`,  `description` 변경
    - 설정파일
        - 린트, 프리티어 설정파일: `/`
        - 웹팩 설정파일: `/config`
        - 스크립트 파일: `/scripts`
        - 프록시 설정: `package.json`파일 `proxy` 프로퍼티
        - 바벨 브라우저 지원 설정: `package.json`파일 `browserslist` 프로퍼티

## 사용하기

### 스크립트
* 개발 서버
```
yarn start
```
* 빌드
```
yarn build
yarn build_size
```
* 테스트
```
yarn test
```
* 다국어 스캔
```
yarn i18scan
```

### Request
```js
import Client from 'src/utils/connection';

Client.get({ endPoint: '/users/1' })
Client.post({ url: 'http://localhost:8888/product', body: formData }); 
```

* Client 클래스 수정 필요시: `utils/connection` 폴더

### 개발 예시
* 리듀서 개발: `src/reducer/user`
* 컴포넌트 개발: `src/view/home`
    * `useDispatch`: src/view/home/index
    * `connect`: src/view/home/HomeEx2

### 리액트 라우터 설정
`src/routes.tsx`의 `routes`에 path와 element를 추가