"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/authContext";

interface DashboardSidebarProps {
  title: string;
}

export default function DashboardSidebar({ title }: DashboardSidebarProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold ">{title}</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>Dashboard sidebar</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center bg-red-700 text-white rounded-md px-4 py-2 "
        >
          Log out
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
