import { Suspense } from "react";
import CreateSkillDialog from "@/features/skill-library/ui/CreateSkillDialog";
import SkillGrid from "@/features/skill-library/ui/SkillGrid";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">내 스킬</h1>
          <p className="text-sm text-muted-foreground mt-1">
            노드 플로우로 AI Agent Skills를 시각적으로 만드세요
          </p>
        </div>
        <CreateSkillDialog />
      </div>
      <Suspense fallback={<SkillGrid.Skeleton />}>
        <SkillGrid />
      </Suspense>
    </div>
  );
}
