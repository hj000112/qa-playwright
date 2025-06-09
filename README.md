# 🧪 QA Portfolio - E2E 테스트 자동화 프로젝트

Playwright 기반의 End-to-End 테스트 자동화 프로젝트입니다.  
로그인, 장바구니 등의 주요 사용자 흐름에 대해 테스트 케이스를 작성하고,  
**GitHub Actions 기반 CI 환경에서 테스트를 자동 실행**할 수 있도록 구성되어 있습니다.

---

## 1. 📌 프로젝트 개요

- **목표**: 테스트 케이스에 따른 주요 기능 테스트 자동화
- **기술**: Playwright, TypeScript, GitHub Actions, dotenv
- **테스트 목적**:  
  - standard user 로그인
  - 장바구니 담기 / 삭제 / 페이지 이동 등 주요 기능 검증

---
## 2. 📁 프로젝트 구조

    qa-portfolio/
    ├── e2e/ # 실제 E2E 테스트 파일 (login.spec.ts, cart.spec.ts 등)
    ├── helpers/             # 공통 로그인 함수, 상수 모듈 폴더
    │ ├── auth.ts            # 로그인 함수 정의
    │ └── constants.ts       # 계정, URL 등 테스트 상수
    ├── node_modules/       
    ├── .env # 개발용 환경변수 (.gitignore에 포함)
    ├── .gitignore
    ├── package.json     
    ├── package-lock.json
    ├── playwright.config.ts # Playwright 테스트 설정
    ├── tsconfig.json        # TypeScript 설정
    └── README.md            




---

## 3. ⚙️ 기술 스택

| 항목            | 사용 기술                              |
| --------------- | --------------------------------------- |
| 테스트 프레임워크 | [Playwright](https://playwright.dev/)     |
| 언어            | TypeScript          |
| 테스트 환경     | GitHub Actions (CI), local desktop      |
| 환경변수 관리   | dotenv + git-secret 조합                |

---

## 4. 🔐 ID / PW 보관 방법

- **개발 환경**:  
  `.env` 파일을 사용하여 민감 정보(.env → `STANDARD_USER`, `COMMON_PASSWORD` 등)를 관리합니다.

- **배포 및 협업 환경**:  
  민감 정보는 `.env`에 그대로 저장하지 않고 [`git-secret`](https://github.com/sobolevn/git-secret)으로 암호화하여 안전하게 공유합니다.

> `.env` 파일은 `.gitignore`에 포함되어 있으므로 Git에 직접 커밋되지 않습니다.

---

## 5. ▶ 실행 방법

### 5.1 의존성 설치
```bash
npm install
```

### 5.2 전체 테스트 실행
```bash
npx playwright test
```

### 5.3 Desktop 테스트 debug 실행 
```bash
npx playwright test --debug
```



### 5.4 UI 보기 실행 (Playwright Test UI 대시보드)
```bash
npx playwright test --ui
```

### 5.5 특정 파일 테스트 실행 (예: cart.spec.ts)
```bash
npx playwright test e2e/cart.spec.ts
```
