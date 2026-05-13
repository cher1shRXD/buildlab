import { Download, Upload, Plus, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const OPERATION_MODES: { op: string; Icon: LucideIcon; label: string; hint: string }[] = [
  { op: "read",   Icon: Download, label: "읽기",  hint: "저장된 값을 불러옵니다" },
  { op: "write",  Icon: Upload,   label: "저장",  hint: "값을 새로 저장합니다 (덮어씀)" },
  { op: "append", Icon: Plus,     label: "추가",  hint: "기존 값에 새 내용을 이어 붙입니다" },
  { op: "clear",  Icon: Trash2,   label: "삭제",  hint: "저장된 값을 지웁니다" },
];
