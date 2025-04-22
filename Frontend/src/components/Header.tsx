
import { BellIcon, Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface HeaderProps {
  title: string;
}

interface User {
  username: string;
  role: string;
}

const Header = ({ title }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      setUser(JSON.parse(userString));
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="h-16 px-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800 ml-8 md:ml-0">{title}</h1>
        
        <div className="hidden md:flex items-center gap-3 max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="search"
              placeholder="Search..." 
              className="w-full pl-8 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full relative border-0 bg-gray-50 hover:bg-gray-100"
              >
                <BellIcon className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2 font-medium">Notifications</div>
              <DropdownMenuSeparator />
              <div className="py-6 text-center text-sm text-gray-500">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8 border border-gray-200">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {user?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user?.username}</p>
                  <p className="text-sm text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => {
                  sessionStorage.removeItem("isLoggedIn");
                  sessionStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
