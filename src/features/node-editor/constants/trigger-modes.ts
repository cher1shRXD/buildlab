import { Hash, Play, Globe, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { TriggerItem } from "@/entities/flow/types";

export const TRIGGER_MODES: { kind: TriggerItem["kind"]; Icon: LucideIcon; label: string; placeholder: string; hint: string }[] = [
  { kind: "keyword", Icon: Hash,          label: "단어/명령어", placeholder: "예: /배포",         hint: "이 단어가 입력되면 실행" },
  { kind: "context", Icon: MessageCircle, label: "문맥 감지",   placeholder: "예: 코드 리뷰해줘", hint: "비슷한 의도의 메시지가 오면 실행" },
  { kind: "manual",  Icon: Play,          label: "수동 호출",   placeholder: "",                  hint: "다른 도구에서 직접 호출" },
  { kind: "webhook", Icon: Globe,         label: "외부 연동",   placeholder: "웹훅 경로",         hint: "HTTP 요청으로 외부에서 트리거" },
];
