import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Course {
  id: string;
  courseCode: string;
  courseName: string;
  description: string;
  credits: number;
  teacherId: string;
}

const CoursesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Omit<Course, "id">>({
    courseCode: "",
    courseName: "",
    description: "",
    credits: 3,
    teacherId: "",
  });
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load mock data from sessionStorage or initialize with sample data
    const storedCourses = sessionStorage.getItem("courses");
    if (storedCourses) {
      setCourses(JSON.parse(storedCourses));
    } else {
      const sampleCourses: Course[] = [
        {
          id: "1",
          courseCode: "CS101",
          courseName: "Introduction to Computer Science",
          description: "Fundamental concepts of programming and algorithm design",
          credits: 3,
          teacherId: "1",
        },
        {
          id: "2",
          courseCode: "CS202",
          courseName: "Data Structures",
          description: "Study of data organization, manipulation, and storage",
          credits: 4,
          teacherId: "2",
        },
        {
          id: "3",
          courseCode: "CS303",
          courseName: "Web Development",
          description: "Building and designing web applications",
          credits: 3,
          teacherId: "3",
        },
      ];
      setCourses(sampleCourses);
      sessionStorage.setItem("courses", JSON.stringify(sampleCourses));
    }
  }, [navigate]);

  const handleAddCourse = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const courseToAdd = { id, ...newCourse };
    const updatedCourses = [...courses, courseToAdd];
    
    setCourses(updatedCourses);
    sessionStorage.setItem("courses", JSON.stringify(updatedCourses));
    
    setNewCourse({ courseCode: "", courseName: "", description: "", credits: 3, teacherId: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Course Added",
      description: `${courseToAdd.courseName} has been added successfully`,
    });
  };

  const handleEditCourse = () => {
    if (!editCourse) return;
    
    const updatedCourses = courses.map((course) =>
      course.id === editCourse.id ? editCourse : course
    );
    
    setCourses(updatedCourses);
    sessionStorage.setItem("courses", JSON.stringify(updatedCourses));
    
    setEditCourse(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Course Updated",
      description: `${editCourse.courseName} has been updated successfully`,
    });
  };

  const handleDeleteCourse = () => {
    if (!courseToDelete) return;
    
    const updatedCourses = courses.filter((course) => course.id !== courseToDelete.id);
    
    setCourses(updatedCourses);
    sessionStorage.setItem("courses", JSON.stringify(updatedCourses));
    
    setCourseToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Course Deleted",
      description: `${courseToDelete.courseName} has been removed from the system`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Courses Management" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Courses</h1>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Add New Course
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to create a new course.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="courseCode">Course Code</Label>
                      <Input
                        id="courseCode"
                        placeholder="Enter course code"
                        value={newCourse.courseCode}
                        onChange={(e) => setNewCourse({ ...newCourse, courseCode: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        placeholder="Enter course name"
                        value={newCourse.courseName}
                        onChange={(e) => setNewCourse({ ...newCourse, courseName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter course description"
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="credits">Credits</Label>
                      <Input
                        id="credits"
                        type="number"
                        min="1"
                        max="6"
                        value={newCourse.credits}
                        onChange={(e) => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="teacherId">Teacher ID</Label>
                      <Input
                        id="teacherId"
                        placeholder="Enter teacher ID"
                        value={newCourse.teacherId}
                        onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddCourse}>Add Course</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50 border-b p-4">
                <CardTitle className="text-lg">All Courses</CardTitle>
                <CardDescription>
                  Manage your university's course offerings
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Teacher ID</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.length > 0 ? (
                      courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-medium">{course.id}</TableCell>
                          <TableCell>{course.courseCode}</TableCell>
                          <TableCell>{course.courseName}</TableCell>
                          <TableCell>{course.description}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>{course.teacherId}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Dialog open={isEditDialogOpen && editCourse?.id === course.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setEditCourse(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditCourse(course);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Pencil size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Course</DialogTitle>
                                  <DialogDescription>
                                    Update the course information below.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {editCourse && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-courseCode">Course Code</Label>
                                      <Input
                                        id="edit-courseCode"
                                        value={editCourse.courseCode}
                                        onChange={(e) => setEditCourse({ ...editCourse, courseCode: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-courseName">Course Name</Label>
                                      <Input
                                        id="edit-courseName"
                                        value={editCourse.courseName}
                                        onChange={(e) => setEditCourse({ ...editCourse, courseName: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-description">Description</Label>
                                      <Textarea
                                        id="edit-description"
                                        value={editCourse.description}
                                        onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-credits">Credits</Label>
                                      <Input
                                        id="edit-credits"
                                        type="number"
                                        min="1"
                                        max="6"
                                        value={editCourse.credits}
                                        onChange={(e) => setEditCourse({ ...editCourse, credits: Number(e.target.value) })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-teacherId">Teacher ID</Label>
                                      <Input
                                        id="edit-teacherId"
                                        value={editCourse.teacherId}
                                        onChange={(e) => setEditCourse({ ...editCourse, teacherId: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditCourse}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog open={isDeleteDialogOpen && courseToDelete?.id === course.id} onOpenChange={(open) => {
                              setIsDeleteDialogOpen(open);
                              if (!open) setCourseToDelete(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setCourseToDelete(course);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Course</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this course? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {courseToDelete && (
                                  <div className="py-4">
                                    <p className="mb-2 font-medium">{courseToDelete.courseName}</p>
                                    <p className="text-sm text-gray-500">{courseToDelete.description}</p>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleDeleteCourse}>
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          No courses found. Add your first course to get started.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoursesPage;
