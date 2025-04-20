
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in, if so redirect to dashboard, otherwise to login
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    console.log("Index page - isLoggedIn:", isLoggedIn);
    
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Please wait while we redirect you to the appropriate page.</p>
      </div>
    </div>
  );
};

export default Index;
