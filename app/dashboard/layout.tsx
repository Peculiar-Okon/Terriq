import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F3ED]">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <main className="min-h-screen">{children}</main>
        </div>
      </div>
    </div>
  );
}