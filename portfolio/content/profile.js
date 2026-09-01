// The persona behind the channel.
//
// 김젬니 (@kim.gemni) is a fictional character and every figure on this page
// is invented sample content. Nothing here is a claim about a real person,
// a real account or a real programme. See README.

export const PROFILE = {
  handle: "@kim.gemni",
  name: "김젬니",
  latin: "GEMNI KIM",
  born: "2002",
  role: "콘텐츠 크리에이터 · Google 학생 앰버서더 2기",
  tagline: "02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키",
  bio: [
    "전공은 미디어커뮤니케이션, 실제로 하는 일은 '남의 마감 대신 걱정해주기'입니다. 2024년 가을, 전공서 600쪽을 이틀 만에 정리해야 했던 밤에 정리해둔 메모를 뉴스레터로 보내기 시작한 게 채널의 시작이었습니다.",
    "지금은 인스타그램에서 매주 실전 치트키를 하나씩 올립니다. 유행하는 도구를 소개하는 대신, 그 주에 제가 실제로 써본 것만 다룹니다. 안 되는 건 안 된다고 쓰는 게 이 채널이 지금까지 남아 있는 이유라고 생각합니다.",
    "2025년부터 Google 학생 앰버서더로 활동하며 캠퍼스 부스와 워크숍을 열었고, 2026년에는 다음 기수 온보딩을 맡았습니다. 온라인에서 만든 걸 오프라인에서 검증하고, 거기서 나온 이야기를 다시 콘텐츠로 돌리는 순환이 지금의 작업 방식입니다.",
  ],
  channelLines: [
    "02년생 선배가 캠퍼스 미션 대신 깨주는 AI 단축키 💻",
    "과제·시험 벼락치기 / 자소서·취준 / 자격증 / 캠퍼스 라이프",
    "#TeamGemini | 매주 실전 치트키 업데이트 📦",
  ],
};

export const STATS = [
  { label: "인스타그램 팔로워", value: "52,400", note: "@kim.gemni" },
  { label: "뉴스레터 구독자", value: "14,800", note: "연속 96호 발행" },
  { label: "누적 콘텐츠 조회", value: "1,240만", note: "2024.09 — 2026.08" },
  { label: "오프라인 참여", value: "2,200명+", note: "부스·워크숍 합계" },
];

// The four lanes in the channel bio. Every work belongs to exactly one.
export const TRACKS = [
  {
    name: "과제·시험 벼락치기",
    blurb:
      "마감이 24시간 안쪽일 때 여는 칸. 레포트 초안, 전공서 요약, 시험 2주 설계.",
    accent: "blue",
  },
  {
    name: "자소서·취준",
    blurb:
      "완성본을 베끼는 대신 내 경험을 캐내는 쪽. 자소서 문항, 면접 연습, 지원 관리.",
    accent: "violet",
  },
  {
    name: "자격증",
    blurb:
      "정보량보다 지속이 문제인 영역. 60일 챌린지, 오답 되묻기, 교환학생 서류까지.",
    accent: "amber",
  },
  {
    name: "캠퍼스 라이프",
    blurb: "팀플, 발표, 개강 세팅. 학교 안에서만 통하는 문제들.",
    accent: "green",
  },
];

// Reverse chronological. `now` marks the row that is still running.
export const TIMELINE = [
  {
    period: "2026.09 —",
    title: "#TeamGemini 학교별 운영진 1기 모집",
    org: "@kim.gemni",
    body: "9개 학교 18명 선발. 톤 가이드라인을 먼저 문서로 만들고 학교당 두 명 체제로 운영 중.",
    now: true,
  },
  {
    period: "2026.03 — 2026.08",
    title: "Google 학생 앰버서더 2기 · 온보딩 리드",
    org: "Google Student Ambassador",
    body: "2기 62명 대상 3시간 워크숍 설계와 진행, 기수 인수인계 핸드북 집필.",
  },
  {
    period: "2025.09 — 2026.02",
    title: "Google 학생 앰버서더 1기",
    org: "Google Student Ambassador",
    body: "4개 캠퍼스 부스 운영(방문 1,930명), 학과별 캠페인 26편, 교내 워크숍 5회.",
  },
  {
    period: "2025.06",
    title: "채널 첫 히트작 「밤샘 대신 90분」",
    org: "@kim.gemni",
    body: "단일 릴스 184만 조회, 3주간 팔로워 11,000명 순증. 채널의 방향이 여기서 정해졌다.",
  },
  {
    period: "2025.03",
    title: "인스타그램 채널 개설",
    org: "@kim.gemni",
    body: "뉴스레터에서 반응이 좋았던 꼭지를 영상으로 옮기며 시작.",
  },
  {
    period: "2024.11",
    title: "교내 학습공동체 「전공책 요약 프로토콜」",
    org: "교내 학습지원센터",
    body: "3회 84명. 채널을 열기 전 오프라인에서 먼저 검증한 원형.",
  },
  {
    period: "2024.09",
    title: "「치트키 뉴스레터」 창간",
    org: "@kim.gemni",
    body: "매주 화요일 아침 발송. 지금까지 결호 없음.",
  },
];

export const AWARDS = [
  { year: "2026", title: "교내 창의활동 우수상", org: "학생지원처" },
  {
    year: "2026",
    title: "학생 앰버서더 우수 활동 사례 선정",
    org: "프로그램 운영진",
  },
  { year: "2025", title: "캠퍼스 콘텐츠 공모전 대상", org: "총학생회" },
];

// What people actually write in asking for.
export const SERVICES = [
  {
    title: "캠퍼스 세션",
    body: "학과·동아리 대상 90–120분 워크숍. 발표 자료, 전공서 요약, 시험 설계 중 하나를 골라 실습으로 진행합니다.",
  },
  {
    title: "콘텐츠 협업",
    body: "학생 대상 서비스·프로그램의 릴스, 카드뉴스, 템플릿 제작. 광고 표기는 예외 없이 본문 첫 줄에 답니다.",
  },
  {
    title: "채널 컨설팅",
    body: "학교 계정·학생 단체 계정 운영 상담. 포맷 설계와 발행 주기 잡는 쪽에 초점.",
  },
];

export const FAQ = [
  {
    q: "AI가 대신 써주는 걸 알려주는 채널인가요?",
    a: "아닙니다. 문장은 본인이 씁니다. 다루는 건 자료를 모으고, 순서를 잡고, 스스로 되묻는 과정입니다. 대신 써주는 방식으로 만든 초기 콘텐츠 두 편은 내렸습니다.",
  },
  {
    q: "왜 매번 실패 장면을 넣나요?",
    a: "첫 답이 엉뚱하게 나오는 게 기본값이기 때문입니다. 그 다음에 어떻게 다시 묻는지가 실제로 필요한 부분이고, 그 구간을 넣은 뒤로 '나도 해볼 수 있겠다'는 반응이 늘었습니다.",
  },
  {
    q: "학교마다 사정이 다른데 어떻게 다루나요?",
    a: "정보를 대신 정리해주는 대신 본인 학교 공지를 직접 넣어 확인하는 법을 알려주는 쪽으로 옮기고 있습니다. 그게 유일하게 확장되는 방식이었습니다.",
  },
  {
    q: "광고는 받나요?",
    a: "받습니다. 다만 직접 써본 것만, 본문 첫 줄에 광고 표기를 달고 진행합니다. 이 조건 때문에 거절한 제안이 더 많습니다.",
  },
];

export const CONTACT = {
  instagram: "@kim.gemni",
  email: "hello@kimgemni.example",
  newsletter: "매주 화요일 아침 발송",
  note: "협업·강연 문의는 인스타그램 DM 또는 메일로. 보통 2–3일 안에 답합니다.",
};
