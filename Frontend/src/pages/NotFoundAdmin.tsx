
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

const NotFoundAdmin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
            <FileSearch className="h-12 w-12 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-700">
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundAdmin;
