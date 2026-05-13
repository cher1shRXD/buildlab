"use client";

import type { SkillMeta } from "@/entities/skill/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useSkillCard } from "../hooks/useSkillCard";

interface Props {
  skill: SkillMeta;
}

const SkillCard = ({ skill }: Props) => {
  const {
    isPending,
    confirmDelete,
    setConfirmDelete,
    handleDelete,
    handleNavigate,
  } = useSkillCard(skill);

  return (
    <Card className="group hover:shadow-md transition-all hover:-translate-y-0.5 cursor-pointer">
      <CardHeader className="py-2">
        <div className="flex items-start justify-between">
          <CardTitle
            className="text-base truncate flex-1 min-w-0 cursor-pointer"
            onClick={handleNavigate}
          >
            {skill.name}
          </CardTitle>
          <DropdownMenu onOpenChange={(open) => { if (!open) setConfirmDelete(false); }}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                />
              }
            >
              <MoreHorizontal size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleNavigate}>
                편집
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleDelete}
                disabled={isPending}
                className={confirmDelete ? "text-destructive bg-destructive/10 gap-2 font-medium" : "text-destructive gap-2"}
              >
                <Trash2 size={14} />
                {confirmDelete ? "한 번 더 클릭해서 삭제" : "삭제"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent
        className="pb-2 cursor-pointer"
        onClick={handleNavigate}
      >
        {skill.description ? (
          <p className="text-sm text-muted-foreground line-clamp-2">{skill.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground/50 italic">설명 없음</p>
        )}
      </CardContent>
      <CardFooter className="gap-2 flex-wrap">
        <Badge variant="secondary" className="text-xs">
          v{skill.version}
        </Badge>
        {skill.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag}
          </Badge>
        ))}
        <span className="ml-auto text-xs text-muted-foreground">
          {new Date(skill.updatedAt).toLocaleDateString("ko-KR")}
        </span>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;
