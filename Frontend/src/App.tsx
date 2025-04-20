
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NotFoundAdmin from "./pages/NotFoundAdmin";
import Index from "./pages/Index";
import CoursesPage from "./pages/courses/CoursesPage";
import PaymentsPage from "./pages/payments/PaymentsPage";
import TeachersPage from "./pages/teachers/TeachersPage";
import StudentsPage from "./pages/students/StudentsPage";
import DepartmentsPage from "./pages/departments/DepartmentsPage";
import ExamsPage from "./pages/exams/ExamsPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/exams" element={<ExamsPage />} />
            
            {/* Index route for redirection logic */}
            <Route path="/" element={<Index />} />
            
            {/* Admin-specific 404 page */}
            <Route path="/admin/*" element={<NotFoundAdmin />} />
            
            {/* General 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
