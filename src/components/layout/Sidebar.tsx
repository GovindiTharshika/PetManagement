import React, { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  PawPrint,
  Calendar,
  Pill,
  Syringe,
  LineChart,
  DollarSign,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className = "" }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const navItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/" },
    { icon: <PawPrint size={20} />, label: "Pet Profiles", path: "/pets" },
    {
      icon: <Calendar size={20} />,
      label: "Appointments",
      path: "/appointments",
    },
    { icon: <Pill size={20} />, label: "Medications", path: "/medications" },
    {
      icon: <Syringe size={20} />,
      label: "Vaccinations",
      path: "/vaccinations",
    },
    { icon: <LineChart size={20} />, label: "Health Metrics", path: "/health" },
    { icon: <DollarSign size={20} />, label: "Expenses", path: "/expenses" },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "/notifications",
    },
    { icon: <Settings size={20} />, label: "Settings", path: "/settings" },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Sidebar container */}
      <div
        className={cn(
          "flex flex-col h-full bg-background border-r transition-all duration-300",
          collapsed ? "w-[80px]" : "w-[280px]",
          isMobileOpen ? "fixed inset-y-0 left-0 z-40" : "hidden md:flex",
          className,
        )}
      >
        {/* Logo and collapse button */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <PawPrint size={24} className="text-primary" />
            {!collapsed && (
              <span className="font-semibold text-lg">PetCare</span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={toggleSidebar}
          >
            {collapsed ? <Menu size={18} /> : <X size={18} />}
          </Button>
        </div>

        {/* User profile */}
        <div
          className={cn(
            "flex items-center gap-3 p-4 border-b",
            collapsed && "justify-center",
          )}
        >
          <Avatar>
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">
                john@example.com
              </span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors",
                    collapsed ? "justify-center" : "",
                  )}
                >
                  <span className="text-muted-foreground">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className={cn(
              "w-full flex items-center gap-2",
              collapsed && "justify-center",
            )}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
