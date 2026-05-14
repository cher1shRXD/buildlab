# Buildlab

AI 에이전트 스킬을 시각적 플로우로 설계하고 `SKILL.md`로 내보내는 웹 기반 빌더.

[buildlab.cher1shrxd.me](https://buildlab.cher1shrxd.me)

<br>

## 프로젝트

노드와 엣지를 연결해 에이전트의 행동 흐름을 설계합니다. 완성된 플로우는 [agentskills.io](https://agentskills.io) 스펙을 따르는 `SKILL.md`로 내보낼 수 있으며, Claude Code 세션에 즉시 로드됩니다.

- 노드/엣지 기반 시각적 캔버스 편집기
- 실시간 플로우 유효성 검사
- `SKILL.md` 원클릭 내보내기
- 스킬 라이브러리 (생성 · 관리 · 재사용)
- GitHub OAuth 인증

<br>

## AI 주도 개발 · 하네스 엔지니어링

이 프로젝트는 **AI 주도 개발** 방식으로 구축되었습니다. Claude Code가 코드를 작성하고, 사람은 AI가 일하는 환경을 설계하는 역할을 맡습니다. 이 접근 방식을 **하네스 엔지니어링**이라 부릅니다.

<br>

### 하네스란

매 작업마다 AI에게 프롬프트를 쓰는 대신, 아키텍처 규칙 · 네이밍 컨벤션 · 레이어 제약 · 설계 패턴을 기계가 읽을 수 있는 명세서로 기록합니다. AI는 작업 전에 이 명세서를 읽고 코드를 작성합니다. 구조는 개발자가 기억할 때만이 아니라, 매 커밋마다 일관되게 유지됩니다.

<br>

### 하네스 구조

```
.claude/
  CLAUDE.md              ← 매 세션에 로드되는 마스터 명세서
  skills/
    fsd/SKILL.md         ← FSD 레이어 규칙
    entity/SKILL.md      ← 엔티티 레이어 컨벤션
    feature/SKILL.md     ← 피처 레이어 컨벤션
    widget/SKILL.md      ← 위젯 레이어 컨벤션
    shared/SKILL.md      ← 공유 레이어 컨벤션
    ui/SKILL.md          ← 컴포넌트 타입별 템플릿
    tailwind-v4/SKILL.md ← Tailwind v4 CSS-first 규칙
    react-compiler/      ← React Compiler 제약 (수동 메모 금지)

AGENTS.md                ← 프로젝트 컨텍스트 및 핵심 버전 정보

scripts/
  check-claude-rules.mjs ← 모든 규칙을 강제하는 정적 분석기
  install-git-hooks.mjs  ← pre-commit 훅 자동 설치
```

AI에게는 매 작업마다 아래 4단계 워킹 플로우가 부여됩니다.

```
1. Explore  →  관련 파일을 읽고, 영향 범위를 파악한다
2. Plan     →  접근법 한 문장 + FSD 레이어별 파일 목록
3. Execute  →  선언한 순서대로, 한 번에 한 파일씩 구현
4. Review   →  rules:check · typecheck 실행, 모든 오류를 직접 수정
```

<br>

### 자동화된 규칙 강제

`check-claude-rules.mjs`는 별도 테스트 프레임워크 없이 Node.js 스크립트로 동작하는 정적 분석기입니다.

| 검사 항목 | 감지 내용 |
|---|---|
| FSD 레이어 임포트 | `shared → entities`, `features → widgets` 등 역방향 참조 |
| 피처 세그먼트 | `actions/hooks/stores/constants/ui/utils` 외 디렉토리 |
| 엔티티 파일명 | `types.ts`, `apis.ts`, `mutations.ts`, `queries.ts` 외 파일 |
| Tailwind v4 | `tailwind.config.js` 존재, v3 디렉티브, 임의 hex 색상 |
| React Compiler | `useMemo`, `useCallback`, `React.memo` 사용 |
| 페이지 서버 컴포넌트 | `page.tsx`에 `'use client'` 선언 |
| 파일 크기 | 170줄 초과 (목표: ~150줄) |
| CLAUDE.md 참조 | 깨진 `@ref` 링크 |

`pnpm build`, `pnpm lint`, 그리고 `git commit` 시 pre-commit 훅으로 자동 실행됩니다.

<br>

## 기술 스택

| | |
|---|---|
| 프레임워크 | Next.js 16 · App Router · standalone |
| UI | React 19 · React Compiler · Tailwind CSS v4 |
| 상태 관리 | TanStack Query v5 · Zustand v5 · Zundo |
| 캔버스 | React Flow (`@xyflow/react`) |
| 데이터베이스 | PostgreSQL via Supabase (RLS) |
| 인증 | Supabase Auth · GitHub OAuth |
| 유효성 검사 | Zod v4 |
| 아키텍처 | Feature-Sliced Design |

<br>

## 아키텍처

단방향 임포트 그래프를 강제하는 FSD 구조입니다.

```
app → widgets → features → entities → shared
```

```
src/
  app/       Next.js 라우트 (Server Components 전용)
  widgets/   독립 UI 블록 (auth-shell, dashboard-sidebar, editor-shell)
  features/  사용자 행동 단위
             auth · canvas-editor · editor-layout
             flow-validation · node-editor · skill-export · skill-library
  entities/  비즈니스 객체 (skill, flow)
  shared/    비즈니스 로직 없는 공통 모듈 (api, config, lib, types, ui)
  db/        Supabase 클라이언트 팩토리 · 스키마 매퍼
```

<br>

## 시작하기

```bash
pnpm install
pnpm dev
```

필요한 환경 변수:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_APP_URL=
```

```bash
pnpm dev           # 개발 서버
pnpm build         # rules:check → tsc → next build
pnpm rules:check   # 하네스 정적 분석기 실행
pnpm typecheck     # TypeScript 타입 검사
```
