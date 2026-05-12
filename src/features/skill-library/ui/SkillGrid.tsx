import { Skeleton } from "@/shared/ui/Skeleton";
import { Zap } from "lucide-react";
import SkillCard from "./SkillCard";
import CreateSkillDialog from "./CreateSkillDialog";
import { SkillApi } from "@/entities/skill/apis";

const SkillGrid = async () => {
  const skills = await SkillApi.getList();
  
  if (skills.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center gap-4">
        <div className="rounded-full bg-muted p-6">
          <Zap size={32} className="text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-lg">아직 스킬이 없습니다</p>
          <p className="text-sm text-muted-foreground mt-1">
            첫 번째 스킬을 만들어 AI 에이전트 능력을 확장하세요
          </p>
        </div>
        <CreateSkillDialog />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};

const SkillGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="h-36 rounded-lg" />
    ))}
  </div>
);

SkillGrid.Skeleton = SkillGridSkeleton;

export default SkillGrid;
