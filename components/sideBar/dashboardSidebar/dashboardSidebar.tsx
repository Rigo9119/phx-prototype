import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";

interface DashboardSidebarProps {
  title: string;
}

export default function DashboardSidebar({ title }: DashboardSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold ">{title}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>Dashboard sidebar</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/"
          className="flex items-center justify-center bg-red-700 text-white rounded-md px-4 py-2 "
        >
          Log out
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
