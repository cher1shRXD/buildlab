@AGENTS.md

# Working Flow

모든 작업은 아래 4단계를 순서대로 따른다. 단계를 건너뛰지 않는다.

## 1. Explore (탐색)
- 관련 파일과 코드를 먼저 읽는다. 추측하지 않는다.
- 영향 범위(어떤 레이어, 어떤 파일)를 파악한다.
- 기존 패턴 및 컨벤션을 확인한다.

## 2. Plan (계획)
- 구현 접근법을 한 문장으로 정리한다.
- FSD 레이어별 생성/수정할 파일 목록을 나열한다.
- 불확실한 부분이 있으면 구현 전에 사용자에게 확인한다.

## 3. Execute (실행)
- Plan에서 정의한 순서대로 구현한다.
- 한 번에 한 파일씩. 완료된 파일은 즉시 표시한다.
- 컨벤션(FSD, naming, Tailwind v4, React Compiler)을 엄수한다.

## 4. Review (검토)
- 변경된 파일이 레이어 컨벤션에 맞는지 확인한다.
- 타입 오류, import 경로, 누락된 `'use client'` 등을 점검한다.
- 문제가 있으면 즉시 수정한다. 사용자에게 넘기지 않는다.

# Architecture

@skills/fsd.md

# UI & Styling

@skills/ui.md
@skills/tailwind.md
@skills/react-compiler.md

# Layer Conventions

## shared
@skills/shared/types.md
@skills/shared/api.md
@skills/shared/config.md
@skills/shared/lib.md
@skills/shared/ui.md

## entities
@skills/entity/type.md
@skills/entity/api.md
@skills/entity/query.md
@skills/entity/mutation.md
@skills/entity/ui.md

## features
@skills/feature/action.md
@skills/feature/hook.md
@skills/feature/store.md
@skills/feature/constant.md
@skills/feature/ui.md
@skills/feature/utils.md

## widgets
@skills/widgets/ui.md
