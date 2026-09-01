// The eighteen pieces of work, in ring order.
//
// This is the single source of truth: `components/ring/projects.js` derives
// the carousel's deal from it, `/works` lists it and `/works/[slug]` reads a
// row straight off it. Reordering rows moves the ring, the index column and
// the 01–18 numbering together.
//
// Everything in here is invented sample content for a fictional persona
// (김젬니, @kim.gemni). The numbers are illustrative, not measurements, and
// nothing here should be presented as a real campaign result. See README.

/**
 * @typedef {object} Work
 * @property {string} slug     url segment, also the art filename stem
 * @property {string} file     art in /public, 1.5:1 to match the atlas cell
 * @property {string} name     the left-hand lockup and the index column
 * @property {string} type     the right-hand lockup — the format
 * @property {string} year     the right-hand lockup
 * @property {string} track    which of the channel's four lanes it belongs to
 * @property {string} period   when it ran
 * @property {string} summary  one line, used as the page's standfirst
 * @property {string[]} role   what 김젬니 actually did on it
 * @property {string[]} tools  the Gemini surfaces it leaned on
 * @property {string} brief    why it existed
 * @property {{title: string, body: string}[]} approach  how it was made
 * @property {{label: string, value: string, note: string}[]} metrics
 * @property {string} outcome  what came of it, including what did not work
 * @property {string[]} tags
 */

/** @type {Work[]} */
export const WORKS = [
  {
    slug: "deadline-rescue",
    file: "deadline-rescue.webp",
    name: "마감 D-1 구조대",
    type: "릴스 시리즈",
    year: "2026",
    track: "과제·시험 벼락치기",
    period: "2026.03 — 진행 중",
    summary:
      "제출 24시간 전에 열어보는 시리즈. 백지 상태에서 초안까지 가는 90분을 릴스 한 편에 압축했다.",
    role: ["시리즈 기획", "촬영·편집", "카피"],
    tools: ["Gemini 2.5 Pro", "NotebookLM", "Canvas"],
    brief:
      "DM으로 가장 많이 들어오는 문장이 '내일까지인데 아직 한 줄도 못 썼어요'였다. 이 순간의 학생은 공부법 콘텐츠를 볼 여유가 없다. 필요한 건 지금 당장 따라 칠 수 있는 순서다. 그래서 '언젠가 도움이 되는 팁'을 버리고, 재생 직후 30초 안에 첫 프롬프트를 화면에 띄우는 포맷으로 바꿨다.",
    approach: [
      {
        title: "30초 안에 첫 프롬프트",
        body: "인트로를 없앴다. 0초에 과제 제목, 3초에 화면 녹화, 8초에 복사해 쓸 프롬프트 전문이 뜬다. 채널 소개와 팔로우 유도는 전부 끝으로 밀었다.",
      },
      {
        title: "세 덩어리로 끊기",
        body: "자료 모으기 → 목차 잡기 → 초안 붙이기. 편마다 한 덩어리씩만 다루고, 세 편이 모여 한 과제가 끝나도록 묶었다. 한 편에 다 넣으면 저장은 되지만 아무도 끝까지 못 본다.",
      },
      {
        title: "실패 장면을 남기기",
        body: "첫 답이 엉뚱하게 나온 컷을 자르지 않고 넣었다. 다시 질문해서 고치는 20초가 붙은 뒤로 '나도 이렇게 물어보면 되는구나'라는 댓글이 눈에 띄게 늘었다.",
      },
    ],
    metrics: [
      { label: "누적 조회", value: "212만", note: "12편 합계" },
      { label: "평균 저장률", value: "9.4%", note: "채널 평균의 2.6배" },
      { label: "완주율", value: "61%", note: "30초 이상 재생 기준" },
      { label: "유입 팔로워", value: "+8,400", note: "시리즈 기간 순증" },
    ],
    outcome:
      "채널에서 가장 오래 도는 시리즈가 됐다. 시험 기간마다 예전 편이 다시 올라온다. 반대로 인문계 과제 편은 이공계 편의 3분의 1도 못 나왔는데, 예시가 '레포트'로 뭉뚱그려져 있어서 자기 얘기로 안 읽힌 탓으로 보고 있다. 다음 시즌은 학과 단위로 쪼갤 계획이다.",
    tags: ["레포트", "마감", "프롬프트", "시리즈"],
  },
  {
    slug: "gsa-campus-booth",
    file: "gsa-campus-booth.webp",
    name: "캠퍼스 부스 데이",
    type: "캠퍼스 이벤트",
    year: "2025",
    track: "캠퍼스 라이프",
    period: "2025.09 — 2025.11 (4개 캠퍼스)",
    summary:
      "Google 학생 앰버서더 활동으로 연 오프라인 부스. 3분 안에 학생 본인의 과제로 결과를 만들어 보내는 것만 목표로 했다.",
    role: ["운영 총괄", "부스 동선 설계", "스크립트 작성"],
    tools: ["Gemini 앱", "Google Drive", "Forms"],
    brief:
      "부스는 대개 굿즈를 받고 지나가는 곳이 된다. 그렇게 되면 앱을 깔아도 그날 저녁에 지워진다. 그래서 '설명을 듣는 부스'가 아니라 '자기 과제를 들고 와서 결과를 가져가는 부스'로 설계했다. 체험 시간은 3분으로 못 박았다.",
    approach: [
      {
        title: "줄 서는 동안 준비시키기",
        body: "대기 줄에서 '다음 주 마감인 과제 하나만 떠올려 오세요' 안내판을 세웠다. 앉자마자 바로 본인 과제로 시작하니 도입 설명이 통째로 사라졌다.",
      },
      {
        title: "테이블당 한 가지만",
        body: "테이블 A는 자료 요약, B는 발표 스크립트, C는 이미지. 한 테이블에서 여러 기능을 보여주려던 1차 리허설이 가장 크게 실패했던 지점이다.",
      },
      {
        title: "결과를 손에 들려 보내기",
        body: "끝나면 결과물을 본인 계정으로 보내게 했다. 카톡 캡처로 끝내지 않고 실제 문서로 남겨야 다음 날 다시 연다.",
      },
    ],
    metrics: [
      { label: "방문", value: "1,930명", note: "4일 합계" },
      { label: "체험 완료", value: "1,120명", note: "결과물 발송 기준" },
      { label: "현장 가입", value: "740건", note: "체험자의 66%" },
      { label: "2주 뒤 재사용", value: "38%", note: "후속 설문 응답 기준" },
    ],
    outcome:
      "체험 완료율이 58%까지 올라간 건 대기 줄 안내판 하나 덕이었다. 반대로 3일차 오후에 인원이 몰리면서 3분 규칙이 무너졌고, 그 시간대만 가입 전환이 눈에 띄게 떨어졌다. 다음 학기에는 시간대별 정원제로 돌린다.",
    tags: ["GSA", "오프라인", "부스", "온보딩"],
  },
  {
    slug: "cover-letter-clinic",
    file: "cover-letter-clinic.webp",
    name: "자소서 응급실",
    type: "라이브",
    year: "2026",
    track: "자소서·취준",
    period: "2026.04 — 격주 목요일",
    summary:
      "격주 목요일 밤 10시 라이브. 익명으로 받은 자소서 문항을 그 자리에서 같이 뜯어본다.",
    role: ["진행", "사전 문항 선별", "아카이브 편집"],
    tools: ["Gemini 2.5 Pro", "Docs", "Gems"],
    brief:
      "자소서 콘텐츠는 완성본 예시가 대부분인데, 완성본은 베끼기밖에 안 된다. 정작 막히는 지점은 '내 경험 중에 뭘 골라야 하는지'다. 그래서 완성본 대신 고르는 과정을 공개했다.",
    approach: [
      {
        title: "익명 제출, 실명 없는 화면",
        body: "구글 폼으로 문항과 초안을 받고 회사명·학교명은 사전에 지웠다. 이걸 안 하면 아무도 안 낸다.",
      },
      {
        title: "고쳐주지 않고 질문만",
        body: "AI에게 대신 쓰게 하는 대신, 경험을 캐내는 질문을 던지게 했다. 문장은 본인이 쓴다. 이 원칙을 어겼던 2회차 아카이브는 조회는 잘 나왔지만 '결국 AI가 쓴 글'이라는 댓글이 붙었다.",
      },
      {
        title: "끝나고 30분 안에 클립",
        body: "라이브에서 가장 반응이 좋았던 구간을 잘라 그날 밤에 올린다. 라이브를 못 본 사람이 다음 회차의 시청자가 된다.",
      },
    ],
    metrics: [
      { label: "평균 동시 시청", value: "1,340명", note: "8회차 평균" },
      { label: "사전 제출", value: "2,100건", note: "누적" },
      { label: "아카이브 조회", value: "47만", note: "클립 포함" },
      { label: "재시청률", value: "44%", note: "직전 회차 시청자 기준" },
    ],
    outcome:
      "채널에서 댓글이 가장 길게 달리는 포맷이다. 다만 밤 10시는 취준 시즌엔 맞고 학기 중엔 안 맞았다. 하반기부터는 시즌별로 시간을 옮긴다.",
    tags: ["자소서", "라이브", "취준", "첨삭"],
  },
  {
    slug: "exam-week-kit",
    file: "exam-week-kit.webp",
    name: "시험기간 생존 키트",
    type: "템플릿",
    year: "2026",
    track: "과제·시험 벼락치기",
    period: "2026.06 배포",
    summary:
      "중간·기말 2주를 통째로 설계해주는 무료 템플릿 팩. 시간표를 넣으면 역산 계획이 나온다.",
    role: ["설계", "템플릿 제작", "배포 페이지"],
    tools: ["Sheets", "Gemini in Sheets", "NotebookLM"],
    brief:
      "'계획표 만들어 주세요'라는 요청이 매 학기 반복됐다. 매번 답해주는 대신 한 번 잘 만들어 두는 쪽이 맞다고 판단했다. 다만 예쁜 계획표는 이미 많아서, 계획이 아니라 '무엇을 버릴지'를 정해주는 쪽으로 잡았다.",
    approach: [
      {
        title: "과목이 아니라 시험 유형으로",
        body: "암기형·계산형·서술형만 고르게 했다. 과목명을 받으면 개인화가 안 된다.",
      },
      {
        title: "버릴 항목을 먼저 표시",
        body: "남은 시간을 넣으면 '이번엔 손대지 말 것'이 먼저 뜬다. 다 하려다 다 못 하는 게 벼락치기의 실패 원인이라 봤다.",
      },
      {
        title: "복사 한 번으로 끝나게",
        body: "설치도, 가입도 없이 사본 만들기 한 번. 안내 영상은 40초로 잘랐다.",
      },
    ],
    metrics: [
      { label: "사본 생성", value: "31,200회", note: "배포 6주" },
      { label: "저장", value: "8.9만", note: "안내 릴스" },
      { label: "재배포 요청", value: "620건", note: "학과 계정·과대" },
      { label: "이탈 지점", value: "3단계", note: "시간표 입력에서 22% 이탈" },
    ],
    outcome:
      "가장 많이 퍼진 결과물이다. 학과 단톡방으로 알아서 돌았다. 시간표 입력 단계 이탈이 22%라 다음 판에서는 입력 항목을 절반으로 줄인다.",
    tags: ["시험", "템플릿", "계획", "무료배포"],
  },
  {
    slug: "major-shortcut-26",
    file: "major-shortcut-26.webp",
    name: "학과별 단축키 26",
    type: "캠페인",
    year: "2025",
    track: "과제·시험 벼락치기",
    period: "2025.03 — 2025.05",
    summary:
      "26개 학과, 26개의 다른 대답. 같은 도구를 학과 언어로 번역한 캠페인.",
    role: ["기획", "학과 리서치", "카피"],
    tools: ["Gemini 2.5 Pro", "Slides", "Forms"],
    brief:
      "'AI로 과제하기'는 아무의 이야기도 아니다. 건축과에게는 도면 검토가, 간호학과에게는 케이스 스터디가 과제다. 하나의 메시지를 26번 번역하는 쪽이, 26번 새로 만드는 것보다 멀리 간다고 봤다.",
    approach: [
      {
        title: "학과 사람에게 먼저 묻기",
        body: "학과별로 재학생 두 명씩 짧게 인터뷰해서 '이번 학기 제일 귀찮은 과제'를 받았다. 리서치 없이 만든 초안 4개는 전부 폐기했다.",
      },
      {
        title: "포맷은 하나로 고정",
        body: "카드 4장 구조를 26개 학과에 그대로 썼다. 학과마다 디자인을 바꾸면 채널이 아니라 전단지가 된다.",
      },
      {
        title: "단톡방을 유통 경로로",
        body: "과대·학생회에 카드와 짧은 안내문을 세트로 보냈다. 개인이 퍼 나르기 쉬운 형태여야 실제로 퍼진다.",
      },
    ],
    metrics: [
      { label: "도달", value: "94만", note: "캠페인 합계" },
      { label: "참여 학과", value: "26개", note: "9개 대학" },
      { label: "공유", value: "2.4만", note: "DM 공유 포함" },
      { label: "가입 전환", value: "3,100건", note: "링크 기준" },
    ],
    outcome:
      "학과 단위로 쪼개는 방식이 이 채널의 기본 문법이 된 계기다. 다만 26개는 너무 많았다. 후반 8개는 리서치가 얕아 반응이 확연히 낮았고, 다음엔 12개로 줄여 깊게 간다.",
    tags: ["캠페인", "학과", "리서치", "카드뉴스"],
  },
  {
    slug: "cert-60-challenge",
    file: "cert-60-challenge.webp",
    name: "자격증 60일",
    type: "챌린지",
    year: "2026",
    track: "자격증",
    period: "2026.01 — 2026.03",
    summary:
      "컴활·토익·정처기 셋 중 하나를 골라 60일을 같이 달리는 참여형 챌린지.",
    role: ["기획", "커리큘럼", "커뮤니티 운영"],
    tools: ["Gemini 앱", "NotebookLM", "Calendar"],
    brief:
      "자격증 콘텐츠는 조회는 나오는데 아무도 끝내지 않는다. 문제는 정보가 아니라 지속이라고 보고, 정보량을 줄이고 체크인 구조를 넣었다.",
    approach: [
      {
        title: "하루 한 장, 그 이상은 금지",
        body: "분량을 늘리면 이틀 만에 밀린다. 밀린 사람이 돌아오지 않는 게 가장 큰 이탈 원인이었다.",
      },
      {
        title: "밀렸을 때의 경로를 미리 깔기",
        body: "3일 이상 밀리면 '축약 트랙'으로 자동 안내했다. 포기 대신 갈아타게 하는 장치.",
      },
      {
        title: "오답만 모아 되묻기",
        body: "틀린 문제를 모아 주간 요약을 만들게 했다. 개인화가 실제로 체감되는 유일한 지점이었다.",
      },
    ],
    metrics: [
      { label: "참가 신청", value: "5,600명", note: "3개 트랙 합계" },
      { label: "60일 완주", value: "1,180명", note: "21%" },
      { label: "합격 보고", value: "430건", note: "자발적 제보" },
      { label: "주간 유지율", value: "72%", note: "4주차 기준" },
    ],
    outcome:
      "완주율 21%는 이런 챌린지 평균보다 높은 편이다. 축약 트랙이 없던 파일럿은 9%였다. 다만 토익 트랙만 유독 낮았는데, 하루 한 장으로 쪼개기 어려운 과목이었다.",
    tags: ["자격증", "챌린지", "커뮤니티", "루틴"],
  },
  {
    slug: "team-project-shield",
    file: "team-project-shield.webp",
    name: "팀플 방어 매뉴얼",
    type: "릴스 시리즈",
    year: "2025",
    track: "캠퍼스 라이프",
    period: "2025.10 — 2025.12",
    summary:
      "무임승차, 잠수, 마감 전날의 대참사. 팀플에서 벌어지는 일을 기록과 요약으로 막는 6편.",
    role: ["기획", "촬영·편집"],
    tools: ["Docs", "Gemini in Docs", "Meet 요약"],
    brief:
      "팀플 고민은 인간관계 문제로 소비되는데, 실제로는 기록이 없어서 생기는 문제가 많다. 누가 뭘 하기로 했는지가 남아 있으면 싸울 일 자체가 줄어든다.",
    approach: [
      {
        title: "회의가 끝나면 3줄",
        body: "결정·담당·기한. 이 세 줄만 남기면 대부분의 분쟁이 사라진다는 걸 앞세웠다.",
      },
      {
        title: "말이 아니라 문서로 통보",
        body: "재촉하는 말투 대신 문서 갱신으로 압박하는 법. 감정 소모가 가장 적은 경로다.",
      },
      {
        title: "최악의 시나리오 편",
        body: "'한 명이 잠수했을 때' 편을 마지막에 뒀다. 가장 많이 저장된 편이기도 하다.",
      },
    ],
    metrics: [
      { label: "누적 조회", value: "128만", note: "6편" },
      { label: "저장", value: "6.2만", note: "잠수 편이 절반" },
      { label: "댓글", value: "9,800", note: "사연 유형 다수" },
      { label: "공유", value: "1.7만", note: "팀 단톡방 공유 추정" },
    ],
    outcome:
      "댓글에 사연이 쌓이면서 다음 시리즈의 소재가 여기서 나왔다. 다만 '기록으로 압박한다'는 프레임이 일부에게는 차갑게 읽혔고, 톤을 다듬을 필요를 확인했다.",
    tags: ["팀플", "협업", "회의록", "시리즈"],
  },
  {
    slug: "first-week-setup",
    file: "first-week-setup.webp",
    name: "개강 첫 주 세팅",
    type: "캠페인",
    year: "2026",
    track: "캠퍼스 라이프",
    period: "2026.02 — 2026.03",
    summary:
      "학기가 시작되기 전 일주일에 끝내는 세팅. 강의계획서 15개를 하루에 정리한다.",
    role: ["기획", "카피", "협업 섭외"],
    tools: ["NotebookLM", "Calendar", "Sheets"],
    brief:
      "학기 초는 의욕이 가장 높고 정보 수용력도 가장 높은 시기다. 이때 한 번 세팅해두면 학기 내내 남는다. 반대로 이 주를 놓치면 그 학기는 회복되지 않는다.",
    approach: [
      {
        title: "강의계획서를 한 번에 던지기",
        body: "PDF 15개를 통째로 넣고 시험·과제 일정만 뽑아 캘린더로 옮기는 흐름. 이 한 컷이 캠페인 전체의 훅이었다.",
      },
      {
        title: "D-day를 미리 박아두기",
        body: "학기 시작 전에 마감일이 캘린더에 다 들어가 있으면, 벼락치기가 시작되는 시점이 2주 앞당겨진다.",
      },
      {
        title: "3일 연속 릴레이",
        body: "월·화·수 3일간 한 단계씩. 하루짜리 콘텐츠보다 완료 인증이 훨씬 많이 올라왔다.",
      },
    ],
    metrics: [
      { label: "도달", value: "76만", note: "3편 합계" },
      { label: "완료 인증", value: "3,400건", note: "스토리 멘션" },
      { label: "저장", value: "5.1만", note: "1편에 집중" },
      { label: "팔로워 순증", value: "+5,200", note: "캠페인 2주" },
    ],
    outcome:
      "개강 시즌은 이 채널의 최대 성수기라는 게 수치로 확인됐다. 3편 중 3편은 반응이 급락했는데, 이미 세팅이 끝난 사람에게 더 시킬 게 없었기 때문이다. 다음엔 2편으로 끝낸다.",
    tags: ["개강", "캘린더", "강의계획서", "시즌"],
  },
  {
    slug: "gsa-onboarding-session",
    file: "gsa-onboarding-session.webp",
    name: "앰버서더 온보딩",
    type: "워크숍",
    year: "2026",
    track: "캠퍼스 라이프",
    period: "2026.03 (2기 온보딩)",
    summary:
      "다음 기수 학생 앰버서더를 위한 3시간 워크숍. 1기가 실패한 것들을 먼저 말했다.",
    role: ["커리큘럼 설계", "진행", "핸드북 집필"],
    tools: ["Slides", "Docs", "Meet"],
    brief:
      "1기 때 아무도 알려주지 않아서 두 달을 버렸다. 학교마다 승인 절차가 다르고, 부스 하나 여는 데도 사전 신청 기한이 있다. 그 정보를 문서로 남기는 게 활동의 마지막 임무라고 생각했다.",
    approach: [
      {
        title: "성공 사례보다 실패 목록",
        body: "잘 된 캠페인 소개는 20분으로 줄이고, 안 된 이유 목록에 한 시간을 썼다.",
      },
      {
        title: "학교별 행정 체크리스트",
        body: "장소 신청 기한, 필요한 서명, 홍보물 승인. 학교가 달라도 구조는 비슷해서 빈칸 양식으로 만들었다.",
      },
      {
        title: "첫 콘텐츠를 그 자리에서",
        body: "워크숍이 끝나기 전에 각자 한 편을 초안까지 만들어 나가게 했다. 집에 가면 안 만든다.",
      },
    ],
    metrics: [
      { label: "참여", value: "62명", note: "2기 전원" },
      { label: "핸드북 열람", value: "1,400회", note: "3개월" },
      { label: "첫 콘텐츠 발행", value: "48명", note: "워크숍 후 2주 내" },
      { label: "만족도", value: "4.7/5", note: "익명 설문 58명" },
    ],
    outcome:
      "핸드북이 기수 인수인계 문서로 남았다. 실패 목록 파트가 가장 반응이 좋았고, 3시간은 길다는 피드백이 많아 다음 기수는 2시간으로 줄이고 행정 파트를 문서로 뺀다.",
    tags: ["GSA", "온보딩", "워크숍", "핸드북"],
  },
  {
    slug: "90min-instead-of-allnighter",
    file: "90min-instead-of-allnighter.webp",
    name: "밤샘 대신 90분",
    type: "릴스 시리즈",
    year: "2025",
    track: "과제·시험 벼락치기",
    period: "2025.06 — 2025.07",
    summary: "밤을 새우지 않고 끝내는 90분 루틴. 채널을 알린 첫 히트작.",
    role: ["기획", "촬영·편집", "카피"],
    tools: ["Gemini 앱", "Keep", "Docs"],
    brief:
      "'열심히'를 파는 콘텐츠는 이미 포화였다. 반대로 '덜 하고 끝내기'는 죄책감 때문에 아무도 정면으로 말하지 않고 있었다. 그 자리를 노렸다.",
    approach: [
      {
        title: "시계를 화면에 띄우기",
        body: "90분 타이머를 영상 내내 올려두고 실제로 그 안에 끝나는 걸 보여줬다. 주장 대신 증거.",
      },
      {
        title: "30-40-20 분배",
        body: "이해 30분, 작성 40분, 다듬기 20분. 숫자로 못 박으면 따라 하기가 쉬워진다.",
      },
      {
        title: "결과물 공개",
        body: "완성본을 끝에 통으로 보여줬다. 품질을 감추면 아무도 안 믿는다.",
      },
    ],
    metrics: [
      { label: "최고 편 조회", value: "184만", note: "단일 릴스" },
      { label: "팔로워 순증", value: "+11,000", note: "공개 후 3주" },
      { label: "저장", value: "7.6만", note: "" },
      { label: "댓글", value: "12,400", note: "" },
    ],
    outcome:
      "이 편으로 채널의 방향이 정해졌다. '시간을 줄여준다'가 다른 어떤 약속보다 잘 먹힌다는 걸 확인했다. 다만 '대충 해도 된다'는 오해를 산 댓글도 많아, 이후 편부터 검토 단계를 반드시 넣는다.",
    tags: ["벼락치기", "루틴", "레포트", "히트작"],
  },
  {
    slug: "interview-rehearsal-room",
    file: "interview-rehearsal-room.webp",
    name: "면접 리허설 룸",
    type: "릴스 시리즈",
    year: "2026",
    track: "자소서·취준",
    period: "2026.05 — 진행 중",
    summary:
      "혼자 하는 면접 연습을 견딜 만하게. 압박 질문을 대신 던져주는 5편.",
    role: ["기획", "출연", "편집"],
    tools: ["Gemini Live", "Gems", "Docs"],
    brief:
      "면접 스터디를 구하기 어렵고, 구해도 일정이 안 맞는다. 혼자 연습하면 자기 대답에 관대해진다. 반박해주는 상대가 필요했다.",
    approach: [
      {
        title: "내 자소서를 먼저 읽히기",
        body: "일반 질문 대신 내가 쓴 문장에서 파고드는 질문을 받게 했다. 이게 실제 면접과 가장 가까웠다.",
      },
      {
        title: "음성으로, 화면 보지 않고",
        body: "타이핑하면 연습이 안 된다. 말로 하다 막히는 지점이 진짜 약점이다.",
      },
      {
        title: "녹취를 다시 듣게 하기",
        body: "본인 답변을 텍스트로 옮겨 읽으면 군더더기가 그대로 보인다. 가장 아프지만 가장 효과가 컸다.",
      },
    ],
    metrics: [
      { label: "누적 조회", value: "63만", note: "5편" },
      { label: "저장률", value: "8.1%", note: "" },
      { label: "DM 후기", value: "310건", note: "면접 결과 제보 포함" },
      { label: "평균 시청", value: "72%", note: "" },
    ],
    outcome:
      "취준 시즌 한정으로 반응이 몰린다. 비시즌에는 조회가 3분의 1로 떨어져, 시즌 콘텐츠로 분류하고 하반기에 재배포하는 쪽으로 운영을 바꿨다.",
    tags: ["면접", "취준", "음성", "시리즈"],
  },
  {
    slug: "textbook-summary-protocol",
    file: "textbook-summary-protocol.webp",
    name: "전공책 요약 프로토콜",
    type: "워크숍",
    year: "2024",
    track: "과제·시험 벼락치기",
    period: "2024.11 (교내 3회)",
    summary:
      "600쪽 전공서를 시험 범위 단위로 접는 법. 교내 학습공동체에서 먼저 검증했다.",
    role: ["설계", "진행"],
    tools: ["NotebookLM", "Docs"],
    brief:
      "요약 콘텐츠는 많지만 대부분 짧은 글 기준이다. 전공서는 분량 자체가 문제라 접근이 달라야 했다. 채널을 열기 전, 교내 스터디에서 먼저 돌려보고 통하는지 확인한 원형이다.",
    approach: [
      {
        title: "챕터가 아니라 시험 범위로",
        body: "책의 목차가 아니라 강의계획서의 범위로 잘랐다. 시험에 안 나오는 챕터를 요약하는 게 가장 큰 낭비였다.",
      },
      {
        title: "출처를 붙이게 하기",
        body: "요약문마다 원문 쪽수를 남기게 했다. 확인이 안 되면 시험장에서 못 쓴다.",
      },
      {
        title: "되묻기로 검증",
        body: "요약본만 두고 스스로 문제를 만들어 풀게 했다. 여기서 걸리는 부분이 실제로 안 읽힌 부분이다.",
      },
    ],
    metrics: [
      { label: "참여", value: "84명", note: "3회" },
      { label: "재신청", value: "51명", note: "2·3회차" },
      {
        label: "체감 시간 절감",
        value: "평균 4.2시간",
        note: "자가 보고, 주관적",
      },
      { label: "이후 콘텐츠화", value: "4편", note: "채널 초기 소재" },
    ],
    outcome:
      "채널의 원형이 된 작업이다. 오프라인에서 통한 걸 그대로 영상으로 옮겼더니 길이가 안 맞아 다시 짰다. 시간 절감 수치는 자가 보고라 신뢰도가 낮다는 걸 명시해 두고 있다.",
    tags: ["전공서", "요약", "오프라인", "원형"],
  },
  {
    slug: "cheatkey-newsletter",
    file: "cheatkey-newsletter.webp",
    name: "치트키 뉴스레터",
    type: "뉴스레터",
    year: "2024",
    track: "자격증",
    period: "2024.09 — 진행 중 (매주 화요일)",
    summary:
      "매주 화요일 아침, 그 주에 실제로 쓴 것만 한 통. 채널보다 먼저 시작했다.",
    role: ["기획", "집필", "발송"],
    tools: ["Gemini 2.5 Pro", "Sheets", "Docs"],
    brief:
      "인스타는 흘러가고 검색이 안 된다. 다시 찾아볼 수 있는 저장소가 필요했다. 유행하는 도구 소개 대신 '내가 이번 주에 실제로 쓴 것'만 쓴다는 규칙 하나로 버텼다.",
    approach: [
      {
        title: "한 통에 세 꼭지",
        body: "이번 주의 프롬프트 하나, 실패담 하나, 마감 임박 공지 하나. 길어지면 열람률이 바로 떨어진다.",
      },
      {
        title: "안 쓴 주는 안 보내지 않기",
        body: "쓸 게 없는 주에는 지난 호 중 하나를 다시 풀었다. 주기를 깨는 게 내용이 부실한 것보다 타격이 크다.",
      },
      {
        title: "인스타로 되먹이기",
        body: "반응이 좋았던 꼭지를 릴스로 다시 만든다. 뉴스레터가 콘텐츠 실험실 역할을 한다.",
      },
    ],
    metrics: [
      { label: "구독자", value: "14,800명", note: "" },
      { label: "평균 열람률", value: "48%", note: "최근 12호" },
      { label: "클릭률", value: "11%", note: "" },
      { label: "연속 발행", value: "96호", note: "결호 없음" },
    ],
    outcome:
      "채널 전체에서 가장 오래된 자산이다. 열람률 48%는 유지되고 있지만 구독자 증가는 정체 상태다. 유입 경로가 인스타 한 곳뿐인 게 원인이라 보고 있다.",
    tags: ["뉴스레터", "아카이브", "주간", "실험실"],
  },
  {
    slug: "job-calendar",
    file: "job-calendar.webp",
    name: "취준 캘린더",
    type: "템플릿",
    year: "2026",
    track: "자소서·취준",
    period: "2026.08 배포",
    summary:
      "공고 마감일을 놓치지 않게. 지원 현황과 서류 마감을 한 화면에 모으는 시트.",
    role: ["설계", "템플릿 제작"],
    tools: ["Sheets", "Gemini in Sheets", "Calendar"],
    brief:
      "탈락보다 흔한 실패가 '마감을 놓치는 것'이다. 지원 현황을 메모장에 흩어 두면 반드시 하나는 샌다. 관리 도구를 새로 배우게 하는 대신 익숙한 시트 한 장으로 끝내게 했다.",
    approach: [
      {
        title: "공고를 붙여 넣으면 채워지게",
        body: "공고 링크와 본문을 붙여 넣으면 회사·직무·마감이 열로 정리된다. 손 입력을 줄이는 게 유일한 관건이었다.",
      },
      {
        title: "D-3에 색이 바뀌게",
        body: "알림을 따로 만들지 않고 시트 안에서 눈에 띄게 했다. 알림은 꺼지지만 색은 안 꺼진다.",
      },
      {
        title: "탈락 기록도 남기기",
        body: "떨어진 이유를 한 줄씩 남기면 다음 자소서의 재료가 된다.",
      },
    ],
    metrics: [
      { label: "사본 생성", value: "12,400회", note: "4주" },
      { label: "저장", value: "4.3만", note: "안내 게시물" },
      { label: "DM 문의", value: "580건", note: "커스텀 요청 다수" },
      { label: "완료 사용", value: "31%", note: "10건 이상 입력 기준" },
    ],
    outcome:
      "배포 직후 반응은 컸는데 실제로 계속 쓰는 비율은 31%였다. 열이 많아 부담스럽다는 피드백이 반복돼, 기본 열을 6개로 줄인 라이트 버전을 준비 중이다.",
    tags: ["취준", "시트", "마감관리", "템플릿"],
  },
  {
    slug: "one-laptop-workshop",
    file: "one-laptop-workshop.webp",
    name: "노트북 한 대로",
    type: "워크숍",
    year: "2025",
    track: "캠퍼스 라이프",
    period: "2025.05 (교내 2회)",
    summary:
      "장비도 예산도 없이 과제 발표를 끝내는 2시간. 학교 도서관 세미나실에서 열었다.",
    role: ["설계", "진행", "자료 제작"],
    tools: ["Slides", "Gemini in Slides", "Drive"],
    brief:
      "발표 자료 때문에 밤을 새우는 건 디자인 실력의 문제가 아니라 순서의 문제다. 내용이 정해지기 전에 슬라이드를 열면 무조건 오래 걸린다.",
    approach: [
      {
        title: "슬라이드를 마지막에 열기",
        body: "문서로 먼저 끝내고 슬라이드는 옮기는 작업만. 이 순서만 바꿔도 절반이 준다.",
      },
      {
        title: "장표 수를 먼저 정하기",
        body: "발표 시간 ÷ 1분. 이 숫자를 정하고 시작하면 분량 조절 고민이 사라진다.",
      },
      {
        title: "질문 3개를 미리 만들기",
        body: "받을 것 같은 질문을 미리 뽑아두면 Q&A가 무너지지 않는다.",
      },
    ],
    metrics: [
      { label: "참여", value: "70명", note: "2회" },
      { label: "만족도", value: "4.6/5", note: "설문 61명" },
      { label: "후속 콘텐츠", value: "3편", note: "" },
      { label: "요청 재개설", value: "5개 학과", note: "" },
    ],
    outcome:
      "'순서를 바꾸는 것'이 도구보다 효과가 크다는 걸 확인한 자리다. 2시간 중 실습 비중이 낮았다는 지적이 있어, 설명을 30분으로 줄인 개정판을 만들었다.",
    tags: ["발표", "슬라이드", "오프라인", "워크숍"],
  },
  {
    slug: "exchange-student-guide",
    file: "exchange-student-guide.webp",
    name: "교환학생 준비반",
    type: "가이드",
    year: "2026",
    track: "자격증",
    period: "2026.07 — 2026.08",
    summary: "서류·어학·수강신청까지 6개월치 절차를 한 장으로 접은 가이드.",
    role: ["리서치", "집필", "카드 제작"],
    tools: ["NotebookLM", "Docs", "Sheets"],
    brief:
      "교환학생은 정보가 학교 공지 PDF에 흩어져 있고, 놓치면 1년을 기다려야 한다. 정보량보다 '언제까지'가 핵심이라 시간 축으로 다시 짰다.",
    approach: [
      {
        title: "공지 PDF를 일정으로 변환",
        body: "학교 공지 묶음을 넣고 마감일만 뽑아 역순으로 배치했다. 학교가 달라도 절차의 뼈대는 같다.",
      },
      {
        title: "어학 성적 유효기간 먼저",
        body: "가장 많이 어긋나는 지점. 시험 접수일부터 거꾸로 계산하는 표를 앞에 뒀다.",
      },
      {
        title: "합격 이후 편을 따로",
        body: "준비 콘텐츠는 많은데 합격 후 절차는 아무도 안 다룬다. 이 편의 저장률이 가장 높았다.",
      },
    ],
    metrics: [
      { label: "조회", value: "41만", note: "카드 8장" },
      { label: "저장", value: "3.8만", note: "합격 후 편에 집중" },
      { label: "공유", value: "6,900", note: "" },
      { label: "DM 질문", value: "420건", note: "학교별 예외 문의" },
    ],
    outcome:
      "학교별 예외가 많아 DM 대응 부담이 컸다. 다음 판은 '내 학교 공지를 직접 넣는 법'을 가르치는 쪽으로 방향을 바꾼다. 정보를 주는 것보다 확인법을 주는 게 확장성이 있다.",
    tags: ["교환학생", "가이드", "일정", "서류"],
  },
  {
    slug: "gemni-office-hours",
    file: "gemni-office-hours.webp",
    name: "젬니 상담소",
    type: "커뮤니티",
    year: "2025",
    track: "캠퍼스 라이프",
    period: "2025.04 — 진행 중",
    summary:
      "DM으로 들어온 질문을 매주 골라 답하는 고정 코너. 이 채널의 소재 창고.",
    role: ["운영", "선별", "제작"],
    tools: ["Gemini 앱", "Keep"],
    brief:
      "DM은 하루에 수백 개가 오는데 개별 답장은 지속이 안 된다. 대신 반복되는 질문 하나를 골라 공개로 답하면 같은 질문을 가진 수백 명에게 닿는다.",
    approach: [
      {
        title: "반복 질문만 고르기",
        body: "특이한 질문은 재미있지만 도움이 안 된다. 그 주에 세 번 이상 들어온 것만 다룬다.",
      },
      {
        title: "질문자를 노출하지 않기",
        body: "학교·학과까지 지우고 상황만 남긴다. 이 원칙 덕에 민감한 질문이 계속 들어온다.",
      },
      {
        title: "답이 없으면 없다고",
        body: "AI로 안 되는 것도 그대로 말한다. 이 코너의 신뢰가 채널 전체를 떠받친다.",
      },
    ],
    metrics: [
      { label: "누적 회차", value: "68회", note: "주 1회" },
      { label: "회당 평균 조회", value: "9.2만", note: "" },
      { label: "질문 수신", value: "월 2,000건+", note: "" },
      { label: "소재 전환", value: "22편", note: "여기서 나온 시리즈" },
    ],
    outcome:
      "가장 조용하지만 가장 오래 가는 코너다. 화려한 편은 없어도 매주 같은 사람들이 본다. 선별에 드는 시간이 계속 늘어 자동 분류를 시도 중이다.",
    tags: ["DM", "커뮤니티", "질문", "고정코너"],
  },
  {
    slug: "team-gemini-onboarding",
    file: "team-gemini-onboarding.webp",
    name: "#TeamGemini 합류",
    type: "캠퍼스 이벤트",
    year: "2026",
    track: "캠퍼스 라이프",
    period: "2026.09 — 모집 중",
    summary:
      "혼자 만들던 걸 같이 만들기로. 학교별 운영진을 뽑아 채널을 지역으로 넓히는 중.",
    role: ["설계", "모집", "가이드라인 집필"],
    tools: ["Forms", "Docs", "Meet"],
    brief:
      "한 사람이 만들 수 있는 콘텐츠 양에는 한계가 있고, 무엇보다 내가 다니지 않는 학교의 사정은 모른다. 학교마다 사람이 있어야 학과별 콘텐츠가 계속 나온다.",
    approach: [
      {
        title: "채널 톤을 문서로",
        body: "말투, 다루지 않는 주제, 광고 표기 원칙을 먼저 문서로 만들었다. 사람이 늘면 톤이 제일 먼저 무너진다.",
      },
      {
        title: "학교당 두 명",
        body: "한 명이면 끊기고 세 명이면 흐지부지된다. 파일럿 3개 학교에서 두 명이 가장 오래 갔다.",
      },
      {
        title: "월 1편만 의무로",
        body: "부담을 낮추는 게 지속의 조건이다. 그 이상은 하고 싶은 사람만.",
      },
    ],
    metrics: [
      { label: "지원", value: "310명", note: "1차 모집" },
      { label: "선발", value: "18명", note: "9개 학교" },
      { label: "파일럿 발행", value: "26편", note: "3개월" },
      { label: "유지율", value: "83%", note: "파일럿 3개월" },
    ],
    outcome:
      "아직 진행 중이라 결과를 말하기 이르다. 확실한 건 톤 가이드를 먼저 쓴 게 옳았다는 것 — 파일럿 초기에 광고 표기 문제로 한 번 크게 어긋날 뻔했고, 문서가 있어서 되돌릴 수 있었다.",
    tags: ["TeamGemini", "운영진", "확장", "모집중"],
  },
];

export const WORK_BY_SLUG = Object.fromEntries(WORKS.map((w) => [w.slug, w]));

export const bySlug = (slug) => WORK_BY_SLUG[slug] ?? null;
