
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  BookOpen, 
  CreditCard, 
  School, 
  FileText, 
  Settings,
  LogOut,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ElementType;
  title: string;
  path: string;
  isActive: boolean;
}

const SidebarItem = ({ icon: Icon, title, path, isActive }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-indigo-100 text-indigo-900 font-medium"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{title}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  const sidebarItems = [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { title: "Students", path: "/students", icon: Users },
    { title: "Teachers", path: "/teachers", icon: UserCheck },
    { title: "Courses", path: "/courses", icon: BookOpen },
    { title: "Payments", path: "/payments", icon: CreditCard },
    { title: "Departments", path: "/departments", icon: School },
    { title: "Exams", path: "/exams", icon: FileText },
    { title: "Settings", path: "/settings", icon: Settings },
    { title: "Emails", path: "/mail", icon: Mail },
  ];

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 top-4 left-4 p-2 bg-white rounded-md shadow-md"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-0",
          isMobile ? "fixed z-40 shadow-lg" : "relative"
        )}
      >
        {isOpen && (
          <>
            <div className="p-6">
              <div className="flex items-center gap-2">
                <School className="h-6 w-6 text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">UniAdmin</h1>
              </div>
            </div>

            <ScrollArea className="flex-1 px-3">
              <div className="space-y-1 py-2">
                {sidebarItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    title={item.title}
                    path={item.path}
                    isActive={location.pathname === item.path}
                  />
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 mt-auto border-t">
              <Button
                variant="outline"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </>
        )}
      </aside>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
