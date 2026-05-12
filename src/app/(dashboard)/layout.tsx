import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import DashboardSidebar from "@/widgets/dashboard-sidebar/ui/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar user={{
          id: session.user.id,
          name: session.user.name ?? "",
          email: session.user.email ?? "",
        }} />
      <main className="flex-1 overflow-y-auto bg-muted/20">{children}</main>
    </div>
  );
}
