import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// Updated interface to match the Examen.java entity
interface Exam {
  id: number;
  type: 'MATH' | 'PHY' | 'FRENCH' | 'ENGLISH' | 'SCI';
  date: string;
  grade: number;
}

const ExamsPage = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [newExam, setNewExam] = useState<Omit<Exam, "id">>({
    type: 'MATH',
    date: '',
    grade: 0
  });

  // Check authentication
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Load exams from session storage if available
      const storedExams = sessionStorage.getItem("exams");
      if (storedExams) {
        setExams(JSON.parse(storedExams));
      } else {
        // Initialize with sample data if nothing exists
        const initialExams: Exam[] = [
          { id: 1, type: "MATH", date: "2025-05-15", grade: 16.5 },
          { id: 2, type: "PHY", date: "2025-05-20", grade: 14.0 },
          { id: 3, type: "FRENCH", date: "2025-04-10", grade: 17.5 },
          { id: 4, type: "ENGLISH", date: "2025-05-25", grade: 15.0 },
          { id: 5, type: "SCI", date: "2025-04-05", grade: 12.0 },
        ];
        setExams(initialExams);
        sessionStorage.setItem("exams", JSON.stringify(initialExams));
      }
    }
  }, [navigate]);

  // Save exams to session storage whenever they change
  useEffect(() => {
    if (exams.length > 0) {
      sessionStorage.setItem("exams", JSON.stringify(exams));
    }
  }, [exams]);

  const handleAddExam = () => {
    const id = exams.length > 0 ? Math.max(...exams.map(exam => exam.id)) + 1 : 1;
    const examToAdd = {
      id,
      ...newExam
    };
    
    setExams([...exams, examToAdd]);
    setNewExam({ type: 'MATH', date: '', grade: 0 });
    setIsAddDialogOpen(false);
    toast.success("Exam added successfully!");
  };

  const handleUpdateExam = () => {
    if (!selectedExam) return;
    
    const updatedExams = exams.map(exam => 
      exam.id === selectedExam.id ? selectedExam : exam
    );
    
    setExams(updatedExams);
    setIsEditDialogOpen(false);
    toast.success("Exam updated successfully!");
  };

  const handleDeleteExam = () => {
    if (!selectedExam) return;
    
    const filteredExams = exams.filter(
      exam => exam.id !== selectedExam.id
    );
    
    setExams(filteredExams);
    setIsDeleteDialogOpen(false);
    toast.success("Exam deleted successfully!");
  };

  const openEditDialog = (exam: Exam) => {
    setSelectedExam(exam);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDeleteDialogOpen(true);
  };

  // Function to get exam type display color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'MATH':
        return 'bg-blue-100 text-blue-800';
      case 'PHY':
        return 'bg-purple-100 text-purple-800';
      case 'FRENCH':
        return 'bg-green-100 text-green-800';
      case 'ENGLISH':
        return 'bg-orange-100 text-orange-800';
      case 'SCI':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Exams" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Exams</h1>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Exam
              </Button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell className="font-medium">{exam.id}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(exam.type)}`}>
                          {exam.type}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(exam.date).toLocaleDateString()}</TableCell>
                      <TableCell>{exam.grade.toFixed(1)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(exam)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500" onClick={() => openDeleteDialog(exam)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add Exam Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Exam</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new exam.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <Select 
                      value={newExam.type} 
                      onValueChange={(value) => setNewExam({ ...newExam, type: value as 'MATH' | 'PHY' | 'FRENCH' | 'ENGLISH' | 'SCI' })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MATH">Math</SelectItem>
                        <SelectItem value="PHY">Physics</SelectItem>
                        <SelectItem value="FRENCH">French</SelectItem>
                        <SelectItem value="ENGLISH">English</SelectItem>
                        <SelectItem value="SCI">Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExam.date}
                      onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input
                      id="grade"
                      type="number"
                      min="0"
                      max="20"
                      step="0.1"
                      value={newExam.grade}
                      onChange={(e) => setNewExam({ ...newExam, grade: parseFloat(e.target.value) })}
                      placeholder="Enter grade (0-20)"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddExam}>Add Exam</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Exam Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Exam</DialogTitle>
                  <DialogDescription>
                    Update the exam details.
                  </DialogDescription>
                </DialogHeader>
                {selectedExam && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-type">Type</Label>
                      <Select 
                        value={selectedExam.type} 
                        onValueChange={(value) => setSelectedExam({ ...selectedExam, type: value as 'MATH' | 'PHY' | 'FRENCH' | 'ENGLISH' | 'SCI' })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select exam type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MATH">Math</SelectItem>
                          <SelectItem value="PHY">Physics</SelectItem>
                          <SelectItem value="FRENCH">French</SelectItem>
                          <SelectItem value="ENGLISH">English</SelectItem>
                          <SelectItem value="SCI">Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-date">Date</Label>
                      <Input
                        id="edit-date"
                        type="date"
                        value={selectedExam.date}
                        onChange={(e) => setSelectedExam({ ...selectedExam, date: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-grade">Grade</Label>
                      <Input
                        id="edit-grade"
                        type="number"
                        min="0"
                        max="20"
                        step="0.1"
                        value={selectedExam.grade}
                        onChange={(e) => setSelectedExam({ ...selectedExam, grade: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateExam}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete Exam Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Exam</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this exam? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                {selectedExam && (
                  <div className="py-4">
                    <p><strong>ID:</strong> {selectedExam.id}</p>
                    <p><strong>Type:</strong> {selectedExam.type}</p>
                    <p><strong>Date:</strong> {new Date(selectedExam.date).toLocaleDateString()}</p>
                    <p><strong>Grade:</strong> {selectedExam.grade.toFixed(1)}</p>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteExam}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamsPage;
