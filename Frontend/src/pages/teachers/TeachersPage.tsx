import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialty: string;
}

const TeachersPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [newTeacher, setNewTeacher] = useState<Omit<Teacher, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
  });
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState<Teacher | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load mock data from sessionStorage or initialize with sample data
    const storedTeachers = sessionStorage.getItem("teachers");
    if (storedTeachers) {
      setTeachers(JSON.parse(storedTeachers));
    } else {
      const sampleTeachers: Teacher[] = [
        {
          id: "1",
          firstName: "Sarah",
          lastName: "Johnson",
          email: "sarah.johnson@university.edu",
          phone: "123-456-7890",
          specialty: "Computer Science",
        },
        {
          id: "2",
          firstName: "Michael",
          lastName: "Lee",
          email: "michael.lee@university.edu",
          phone: "987-654-3210",
          specialty: "Mathematics",
        },
        {
          id: "3",
          firstName: "Emma",
          lastName: "Watson",
          email: "emma.watson@university.edu",
          phone: "555-123-4567",
          specialty: "Physics",
        },
      ];
      setTeachers(sampleTeachers);
      sessionStorage.setItem("teachers", JSON.stringify(sampleTeachers));
    }
  }, [navigate]);

  const handleAddTeacher = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const teacherToAdd = { id, ...newTeacher };
    const updatedTeachers = [...teachers, teacherToAdd];
    
    setTeachers(updatedTeachers);
    sessionStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    
    setNewTeacher({ firstName: "", lastName: "", email: "", phone: "", specialty: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Teacher Added",
      description: `${teacherToAdd.firstName} ${teacherToAdd.lastName} has been added successfully`,
    });
  };

  const handleEditTeacher = () => {
    if (!editTeacher) return;
    
    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === editTeacher.id ? editTeacher : teacher
    );
    
    setTeachers(updatedTeachers);
    sessionStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    
    setEditTeacher(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Teacher Updated",
      description: `${editTeacher.firstName} ${editTeacher.lastName}'s information has been updated successfully`,
    });
  };

  const handleDeleteTeacher = () => {
    if (!teacherToDelete) return;
    
    const updatedTeachers = teachers.filter((teacher) => teacher.id !== teacherToDelete.id);
    
    setTeachers(updatedTeachers);
    sessionStorage.setItem("teachers", JSON.stringify(updatedTeachers));
    
    setTeacherToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Teacher Deleted",
      description: `${teacherToDelete.firstName} ${teacherToDelete.lastName} has been removed from the system`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Teachers Management" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Teachers</h1>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Add New Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to add a new teacher to the system.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter teacher's first name"
                        value={newTeacher.firstName}
                        onChange={(e) => setNewTeacher({ ...newTeacher, firstName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter teacher's last name"
                        value={newTeacher.lastName}
                        onChange={(e) => setNewTeacher({ ...newTeacher, lastName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter teacher's email"
                        value={newTeacher.email}
                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Enter teacher's phone number"
                        value={newTeacher.phone}
                        onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        placeholder="Enter teacher's specialty"
                        value={newTeacher.specialty}
                        onChange={(e) => setNewTeacher({ ...newTeacher, specialty: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddTeacher}>Add Teacher</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50 border-b p-4">
                <CardTitle className="text-lg">Faculty Members</CardTitle>
                <CardDescription>
                  View and manage all teachers in the university
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {teachers.length > 0 ? (
                      teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">{teacher.id}</TableCell>
                          <TableCell>{teacher.firstName}</TableCell>
                          <TableCell>{teacher.lastName}</TableCell>
                          <TableCell>{teacher.email}</TableCell>
                          <TableCell>{teacher.phone}</TableCell>
                          <TableCell>{teacher.specialty}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Dialog open={isEditDialogOpen && editTeacher?.id === teacher.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setEditTeacher(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditTeacher(teacher);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Pencil size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Teacher</DialogTitle>
                                  <DialogDescription>
                                    Update the teacher's information below.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {editTeacher && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-firstName">First Name</Label>
                                      <Input
                                        id="edit-firstName"
                                        value={editTeacher.firstName}
                                        onChange={(e) => setEditTeacher({ ...editTeacher, firstName: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-lastName">Last Name</Label>
                                      <Input
                                        id="edit-lastName"
                                        value={editTeacher.lastName}
                                        onChange={(e) => setEditTeacher({ ...editTeacher, lastName: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-email">Email</Label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={editTeacher.email}
                                        onChange={(e) => setEditTeacher({ ...editTeacher, email: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-phone">Phone</Label>
                                      <Input
                                        id="edit-phone"
                                        value={editTeacher.phone}
                                        onChange={(e) => setEditTeacher({ ...editTeacher, phone: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-specialty">Specialty</Label>
                                      <Input
                                        id="edit-specialty"
                                        value={editTeacher.specialty}
                                        onChange={(e) => setEditTeacher({ ...editTeacher, specialty: e.target.value })}
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditTeacher}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog open={isDeleteDialogOpen && teacherToDelete?.id === teacher.id} onOpenChange={(open) => {
                              setIsDeleteDialogOpen(open);
                              if (!open) setTeacherToDelete(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setTeacherToDelete(teacher);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Teacher</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this teacher? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {teacherToDelete && (
                                  <div className="py-4">
                                    <p className="mb-2 font-medium">{teacherToDelete.firstName} {teacherToDelete.lastName}</p>
                                    <p className="text-sm text-gray-500">{teacherToDelete.email}</p>
                                    <p className="text-sm text-gray-500">Phone: {teacherToDelete.phone}</p>
                                    <p className="text-sm text-gray-500">Specialty: {teacherToDelete.specialty}</p>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleDeleteTeacher}>
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
                          No teachers found. Add your first teacher to get started.
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

export default TeachersPage;
