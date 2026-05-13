import { FileText, AlignLeft, Code2, Braces, LucideIcon } from "lucide-react";


export const FORMAT_MODES: { value: string; Icon: LucideIcon; label: string }[] = [
  { value: "markdown", Icon: FileText,  label: "마크다운" },
  { value: "plain",    Icon: AlignLeft, label: "텍스트" },
  { value: "code",     Icon: Code2,     label: "코드" },
  { value: "json",     Icon: Braces,    label: "JSON" },
];