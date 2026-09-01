# 김젬니 포트폴리오

인스타그램 채널 **[@kim.gemni](#)** 의 작업 아카이브. 첫 화면은 열여덟 개의
작업이 걸린 링이고, 카드를 앞으로 돌려 한 번 더 누르면 그 작업의 상세 페이지로
들어갑니다.

> ▫️ 02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키 💻
> ▫️ 과제·시험 벼락치기 / 자소서·취준 / 자격증 / 캠퍼스 라이프
> ▫️ #TeamGemini | 매주 실전 치트키 업데이트 📦

> [!IMPORTANT]
> **김젬니는 가상의 페르소나입니다.** 프로필, 활동 이력, 조회수·팔로워·전환율
> 같은 수치, 후기와 수상 내역은 전부 이 포트폴리오를 채우기 위해 지어낸 예시
> 데이터입니다. 실제 인물·계정·프로그램의 기록이 아니며, 실제 실적으로 제시해서는
> 안 됩니다. 자기 것으로 쓰려면 `content/`의 두 파일을 본인 내용으로 갈아끼우세요.

## 시작하기

Node 20 이상이 필요합니다.

```bash
npm install
npm run dev     # localhost:3000
```

| 명령              | 하는 일           |
| ----------------- | ----------------- |
| `npm run dev`     | 개발 서버         |
| `npm run build`   | 프로덕션 빌드     |
| `npm start`       | 빌드 결과 서빙    |
| `npm run lint`    | eslint            |

## 구조

```
app/
  page.js              캐러셀 + 상단 내비게이션
  works/page.js        18개 목록 (키보드로 접근 가능한 캐러셀의 대안)
  works/[slug]/page.js 작업 상세 — 배경 / 접근 / 지표 / 결과
  about/page.js        프로필, 활동 타임라인, 수상, FAQ, 문의
  globals.css          Tailwind, @font-face, 스크롤 잠금 클래스

content/
  works.js             18개 작업. 링 순서이자 유일한 원본
  profile.js           페르소나, 지표, 타임라인, 네 개의 축

components/
  Carousel.jsx         WebGL 링 (Viscose 원본)
  SiteNav.jsx          상단 내비게이션
  SiteFooter.jsx       하단 + 예시 데이터 고지
  ring/ shaders/       링의 내부 — AGENTS.md 참고

tools/
  make-cards.mjs       content/works.js로 카드 18장을 그려 public/에 저장
  subset-fonts.py      Pretendard를 KS X 1001 범위로 서브셋
```

### 내용 바꾸기

`content/works.js` 한 곳만 고치면 링의 순서, 오른쪽 인덱스 열, `01`–`18` 번호,
상세 페이지가 함께 따라옵니다. 카드 이미지는 그 파일을 읽어 생성되므로, 이름이나
분류를 바꿨으면 다시 그려주세요.

```bash
npm i -D playwright sharp && npx playwright install chromium
node tools/make-cards.mjs
```

### 글꼴

| 패밀리     | 쓰이는 곳                       | 라이선스                          |
| ---------- | ------------------------------- | --------------------------------- |
| Pretendard | 한글 전부                       | SIL OFL 1.1                       |
| Satoshi    | 인트로 헤딩, 커서 태그, 로고     | ITF Free Font License (Fontshare) |
| Geist      | 숫자, 연도, 로딩 카운터          | SIL OFL 1.1                       |

`public/fonts/`에 들어 있는 Pretendard는 KS X 1001 2,350자로 서브셋한 것입니다
(네 굵기 합쳐 680 KB). 이 범위 밖의 음절은 시스템 글꼴로 떨어지니, 흔치 않은
글자를 쓴 뒤 어색해 보이면 `tools/subset-fonts.py`의 문자 집합을 넓히세요.

패밀리 이름은 **이름으로** 조회됩니다. `components/ring/params.js`의 문자열이
`app/globals.css`의 `@font-face` 블록과 정확히 같아야 하고, 어긋나면 조용히
시스템 산세리프로 떨어집니다.

## 원본

캐러셀은 [Yousuf Soomro](https://github.com/Yousuf-developer)의
[Viscose](https://github.com/Yousuf-developer/Viscose-carousel) (MIT)를
바탕으로 합니다. 링 전체가 하나의 프래그먼트 셰이더로 그려지는 구조라, 카드가
붙었다 떨어질 때 실처럼 늘어지는 것도 같은 패스에서 계산됩니다. 내부 구조와
손대면 안 되는 부분은 [AGENTS.md](AGENTS.md)에 정리되어 있습니다.

원본에서 바꾼 것:

- 작업 데이터를 `content/`로 옮기고 `ring/projects.js`가 그것을 읽도록 함
- 카드 아트를 생성 방식으로 교체 (원본의 Behance 이미지는 전부 제거)
- 상업용 라이선스가 없는 PP Neue Montreal 제거, 한글용 Pretendard 추가
- 원본의 미완성 항목이던 **카드 클릭 시 이동**을 상세 페이지로 연결
- `/works`, `/works/[slug]`, `/about` 페이지와 내비게이션 추가

원본에 그대로 남아 있는 한계도 함께 물려받았습니다: `prefers-reduced-motion`
미대응, 키보드로 링을 돌릴 수 없음(대신 `/works`가 있습니다), 500px 미만
화면에서의 배치가 근사치라는 점.

## 라이선스

소스는 [MIT](LICENSE). `public/`의 내용물은 별도입니다 — 자세한 건 LICENSE에
적어두었습니다.
