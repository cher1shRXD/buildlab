"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/shared/lib/auth-client";

import { Button } from "@/shared/ui/Button";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Separator } from "@/shared/ui/Separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { Logo } from "@/shared/ui/Logo";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Props {
  user: User;
}

const DashboardSidebar = ({ user }: Props) => {
  const pathname = usePathname();

  async function handleSignOut() {
    await signOut();
  }

  return (
    <aside className="w-56 flex flex-col border-r bg-background h-full">
      <div className="flex items-center justify-between px-4 py-4">
        <Logo className="text-primary h-4" />
        <ThemeToggle className="size-7" />
      </div>
      <Separator />
      <nav className="flex-1 p-3 space-y-1">
        <Link href="/dashboard">
          <Button
            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            size="sm"
          >
            <LayoutDashboard size={16} />
            내 스킬
          </Button>
        </Link>
      </nav>
      <Separator />
      <div className="p-3">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2" />
            }
          >
            <Avatar className="size-7">
              <AvatarFallback className="text-xs">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <ChevronDown size={14} className="text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive gap-2">
              <LogOut size={14} />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
