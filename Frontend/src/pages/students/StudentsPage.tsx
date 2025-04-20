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

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  coursFavoris: number[];
  level: 'L1' | 'L2' | 'M1' | 'M2' | 'PhD';
}

const StudentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    coursFavoris: [],
    level: 'L1',
  });
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load mock data from sessionStorage or initialize with sample data
    const storedStudents = sessionStorage.getItem("students");
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    } else {
      const sampleStudents: Student[] = [
        {
          id: "1",
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@university.edu",
          phone: "1234567890",
          address: "123 Main St",
          coursFavoris: [1, 2, 3],
          level: 'L1',
        },
        {
          id: "2",
          firstName: "Alice",
          lastName: "Johnson",
          email: "alice.johnson@university.edu",
          phone: "9876543210",
          address: "456 Elm St",
          coursFavoris: [4, 5, 6],
          level: 'L2',
        },
        {
          id: "3",
          firstName: "Robert",
          lastName: "Brown",
          email: "robert.brown@university.edu",
          phone: "5555555555",
          address: "789 Oak St",
          coursFavoris: [7, 8, 9],
          level: 'M1',
        },
      ];
      setStudents(sampleStudents);
      sessionStorage.setItem("students", JSON.stringify(sampleStudents));
    }
  }, [navigate]);

  const handleAddStudent = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const studentToAdd = { id, ...newStudent };
    const updatedStudents = [...students, studentToAdd];
    
    setStudents(updatedStudents);
    sessionStorage.setItem("students", JSON.stringify(updatedStudents));
    
    setNewStudent({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      coursFavoris: [],
      level: 'L1',
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Student Added",
      description: `${studentToAdd.firstName} ${studentToAdd.lastName} has been added successfully`,
    });
  };

  const handleEditStudent = () => {
    if (!editStudent) return;
    
    const updatedStudents = students.map((student) =>
      student.id === editStudent.id ? editStudent : student
    );
    
    setStudents(updatedStudents);
    sessionStorage.setItem("students", JSON.stringify(updatedStudents));
    
    setEditStudent(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Student Updated",
      description: `${editStudent.firstName} ${editStudent.lastName}'s information has been updated successfully`,
    });
  };

  const handleDeleteStudent = () => {
    if (!studentToDelete) return;
    
    const updatedStudents = students.filter((student) => student.id !== studentToDelete.id);
    
    setStudents(updatedStudents);
    sessionStorage.setItem("students", JSON.stringify(updatedStudents));
    
    setStudentToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Student Deleted",
      description: `${studentToDelete.firstName} ${studentToDelete.lastName} has been removed from the system`,
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Students Management" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Students</h1>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Add New Student
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to add a new student to the system.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter student's first name"
                        value={newStudent.firstName}
                        onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter student's last name"
                        value={newStudent.lastName}
                        onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter student's email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        placeholder="Enter student's phone number"
                        value={newStudent.phone}
                        onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Enter student's address"
                        value={newStudent.address}
                        onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="coursFavoris">Cours Favoris</Label>
                      <Input
                        id="coursFavoris"
                        placeholder="Enter student's cours favoris"
                        value={newStudent.coursFavoris.join(', ')}
                        onChange={(e) => setNewStudent({ ...newStudent, coursFavoris: e.target.value.split(',').map(Number) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="level">Level</Label>
                      <select
                        id="level"
                        value={newStudent.level}
                        onChange={(e) => setNewStudent({ ...newStudent, level: e.target.value as 'L1' | 'L2' | 'M1' | 'M2' | 'PhD' })}
                      >
                        <option value="L1">L1</option>
                        <option value="L2">L2</option>
                        <option value="M1">M1</option>
                        <option value="M2">M2</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddStudent}>Add Student</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50 border-b p-4">
                <CardTitle className="text-lg">Enrolled Students</CardTitle>
                <CardDescription>
                  View and manage all students in the university
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
                      <TableHead>Address</TableHead>
                      <TableHead>Cours Favoris</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.length > 0 ? (
                      students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.firstName}</TableCell>
                          <TableCell>{student.lastName}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.phone}</TableCell>
                          <TableCell>{student.address}</TableCell>
                          <TableCell>{student.coursFavoris.join(', ')}</TableCell>
                          <TableCell>{student.level}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Dialog open={isEditDialogOpen && editStudent?.id === student.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setEditStudent(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditStudent(student);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Pencil size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Student</DialogTitle>
                                  <DialogDescription>
                                    Update the student's information below.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {editStudent && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-firstName">First Name</Label>
                                      <Input
                                        id="edit-firstName"
                                        value={editStudent.firstName}
                                        onChange={(e) => setEditStudent({ ...editStudent, firstName: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-lastName">Last Name</Label>
                                      <Input
                                        id="edit-lastName"
                                        value={editStudent.lastName}
                                        onChange={(e) => setEditStudent({ ...editStudent, lastName: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-email">Email</Label>
                                      <Input
                                        id="edit-email"
                                        type="email"
                                        value={editStudent.email}
                                        onChange={(e) => setEditStudent({ ...editStudent, email: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-phone">Phone</Label>
                                      <Input
                                        id="edit-phone"
                                        value={editStudent.phone}
                                        onChange={(e) => setEditStudent({ ...editStudent, phone: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-address">Address</Label>
                                      <Input
                                        id="edit-address"
                                        value={editStudent.address}
                                        onChange={(e) => setEditStudent({ ...editStudent, address: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-coursFavoris">Cours Favoris</Label>
                                      <Input
                                        id="edit-coursFavoris"
                                        value={editStudent.coursFavoris.join(', ')}
                                        onChange={(e) => setEditStudent({ ...editStudent, coursFavoris: e.target.value.split(',').map(Number) })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-level">Level</Label>
                                      <select
                                        id="edit-level"
                                        value={editStudent.level}
                                        onChange={(e) => setEditStudent({ ...editStudent, level: e.target.value as 'L1' | 'L2' | 'M1' | 'M2' | 'PhD' })}
                                      >
                                        <option value="L1">L1</option>
                                        <option value="L2">L2</option>
                                        <option value="M1">M1</option>
                                        <option value="M2">M2</option>
                                        <option value="PhD">PhD</option>
                                      </select>
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditStudent}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog open={isDeleteDialogOpen && studentToDelete?.id === student.id} onOpenChange={(open) => {
                              setIsDeleteDialogOpen(open);
                              if (!open) setStudentToDelete(null);
                            }}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setStudentToDelete(student);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Student</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this student? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {studentToDelete && (
                                  <div className="py-4">
                                    <p className="mb-2 font-medium">{studentToDelete.firstName} {studentToDelete.lastName}</p>
                                    <p className="text-sm text-gray-500">{studentToDelete.email}</p>
                                    <p className="text-sm text-gray-500">Phone: {studentToDelete.phone}</p>
                                    <p className="text-sm text-gray-500">Address: {studentToDelete.address}</p>
                                    <p className="text-sm text-gray-500">Cours Favoris: {studentToDelete.coursFavoris.join(', ')}</p>
                                    <p className="text-sm text-gray-500">Level: {studentToDelete.level}</p>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleDeleteStudent}>
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
                        <TableCell colSpan={10} className="text-center py-8 text-gray-500">
                          No students found. Add your first student to get started.
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

export default StudentsPage;
