"use client";

import { Logo } from "@/shared/ui/Logo";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/Button";
import { LogOut } from "lucide-react";
import { signOut } from "@/shared/lib/auth-client";

interface Props {
  user: { name: string; email: string };
}

const MobileDashboardHeader = ({ user }: Props) => (
  <header className="lg:hidden flex items-center justify-between px-4 h-13 border-b bg-background shrink-0 sticky top-0 z-10">
    <Logo className="text-primary h-4" />
    <div className="flex items-center gap-1.5">
      <ThemeToggle className="size-8" />
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" className="size-8 rounded-full p-0" />}>
          <Avatar className="size-7">
            <AvatarFallback className="text-xs">
              {user.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <div className="px-2 py-1.5 border-b mb-1">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
          <DropdownMenuItem onClick={() => signOut()} className="text-destructive gap-2">
            <LogOut size={14} />
            로그아웃
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
);

export default MobileDashboardHeader;
