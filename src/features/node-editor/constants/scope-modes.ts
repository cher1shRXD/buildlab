import { MessageCircle, HardDrive, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const SCOPE_MODES: { scope: string; Icon: LucideIcon; label: string; hint: string }[] = [
  { scope: "session",        Icon: MessageCircle, label: "대화 중만",  hint: "대화가 끝나면 사라집니다" },
  { scope: "persistent",     Icon: HardDrive,     label: "영구 보관",  hint: "다음 대화에서도 유지됩니다" },
  { scope: "context-window", Icon: Layers,        label: "컨텍스트",   hint: "AI 컨텍스트 윈도우에 저장합니다" },
];
