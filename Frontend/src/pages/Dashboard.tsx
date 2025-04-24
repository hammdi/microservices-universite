
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { BookOpen, Users, UserCheck, CreditCard, School, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  // Mock data for statistics
  const stats = [
    { title: "Students", value: "2,845", icon: Users, color: "bg-blue-500", link: "/students" },
    { title: "Teachers", value: "142", icon: UserCheck, color: "bg-green-500", link: "/teachers" },
    { title: "Courses", value: "86", icon: BookOpen, color: "bg-purple-500", link: "/courses" },
    { title: "Payments", value: "€124,500", icon: CreditCard, color: "bg-amber-500", link: "/payments" },
    { title: "Departments", value: "12", icon: School, color: "bg-rose-500", link: "/departments" },
    { title: "Exams", value: "234", icon: BarChart2, color: "bg-indigo-500", link: "/exams" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Card */}
            <Card className="mb-6 border-0 shadow-md bg-gradient-to-r from-indigo-600 to-purple-600">
              <CardContent className="pt-6 pb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome, Admin!</h1>
                <p className="text-indigo-100 mt-2">
                  This is your university administration dashboard. Here you can manage students, teachers, courses, and more.
                </p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {stats.map((stat, index) => (
                <Link key={index} to={stat.link} className="block">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-md font-medium text-gray-600">{stat.title}</CardTitle>
                        <div className={`${stat.color} p-2 rounded-md`}>
                          <stat.icon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <CardDescription>Total {stat.title.toLowerCase()}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administration tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Link to="/students" className="block">
                    <button className="p-4 border rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors w-full">
                      <Users className="h-8 w-8 text-blue-500 mb-2" />
                      <span className="text-sm font-medium">Manage Students</span>
                    </button>
                  </Link>
                  <Link to="/teachers" className="block">
                    <button className="p-4 border rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors w-full">
                      <UserCheck className="h-8 w-8 text-green-500 mb-2" />
                      <span className="text-sm font-medium">Manage Teachers</span>
                    </button>
                  </Link>
                  <Link to="/courses" className="block">
                    <button className="p-4 border rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors w-full">
                      <BookOpen className="h-8 w-8 text-purple-500 mb-2" />
                      <span className="text-sm font-medium">Manage Courses</span>
                    </button>
                  </Link>
                  <Link to="/payments" className="block">
                    <button className="p-4 border rounded-md flex flex-col items-center justify-center hover:bg-gray-50 transition-colors w-full">
                      <CreditCard className="h-8 w-8 text-amber-500 mb-2" />
                      <span className="text-sm font-medium">Process Payments</span>
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
