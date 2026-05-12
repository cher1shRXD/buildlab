import { Zap } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FEATURES = [
  "드래그 앤 드롭 노드 에디터",
  "SKILL.md + ZIP 자동 생성",
  "40+ AI 플랫폼 호환 (agentskills.io)",
];

const AuthShell = ({ children }: Props) => (
  <div className="grid min-h-screen lg:grid-cols-2">
    <div className="hidden lg:flex flex-col justify-between bg-primary p-10 text-primary-foreground">
      <div className="flex items-center gap-2 font-bold text-xl">
        <Zap size={20} />
        <span>Buildlab</span>
      </div>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold leading-tight">Build AI Agent Skills<br />visually.</h1>
          <p className="mt-3 text-primary-foreground/70 text-lg">노드 플로우로 설계하고,<br />SKILL.md로 자동 생성됩니다.</p>
        </div>
        <ul className="space-y-3">
          {FEATURES.map((text) => (
            <li key={text} className="flex items-center gap-2.5 text-sm text-primary-foreground/85">
              <span className="text-primary-foreground/50 shrink-0">-</span>
              {text}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-primary-foreground/40">© 2025 Buildlab</p>
    </div>
    <div className="flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-sm space-y-7">
        <div className="lg:hidden flex items-center gap-2 text-primary font-bold text-xl">
          <Zap size={18} />
          <span>Buildlab</span>
        </div>
        {children}
      </div>
    </div>
  </div>
);

export default AuthShell;
