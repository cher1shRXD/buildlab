import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import DashboardSidebar from "@/widgets/dashboard-sidebar/ui/DashboardSidebar";
import MobileDashboardHeader from "@/widgets/dashboard-sidebar/ui/MobileDashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = {
    id: session.user.id,
    name: session.user.name ?? "",
    email: session.user.email ?? "",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block shrink-0">
        <DashboardSidebar user={user} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <MobileDashboardHeader user={user} />
        <main className="flex-1 overflow-y-auto bg-muted/20">{children}</main>
      </div>
    </div>
  );
}
