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
import { toast } from "sonner";
import { getKeycloakToken } from "@/services/authService";

interface Department {
  id: string;
  nom: string;
  description: string;
}

const DepartmentsPage = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState<Omit<Department, "id">>({
    nom: "",
    description: "",
  });

  // Check authentication
  useEffect(() => {


    const fetchDepartments = async () => {
      try {
        const token = await getKeycloakToken();
        const response = await fetch("/departement", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          throw new Error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des départements :", error);
      }
    };

    fetchDepartments();










  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    try {
      const token = await getKeycloakToken();
      const response = await fetch(`/departement/${selectedDepartment.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setDepartments(
          departments.filter((department) => department.id !== selectedDepartment.id)
        );
        setSelectedDepartment(null);
        setIsDeleteDialogOpen(false);
        toast.success("Department deleted successfully!");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du département :", error);
    }
  };





    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      // Load departments from session storage if available
      const storedDepartments = sessionStorage.getItem("departments");
      if (storedDepartments) {
        setDepartments(JSON.parse(storedDepartments));
      } else {
        // Initialize with sample data if nothing exists
        const initialDepartments: Department[] = [
          { id: "1", nom: "Computer Science", description: "Department of Computer Science" },
          { id: "2", nom: "Business Administration", description: "Department of Business Administration" },
          { id: "3", nom: "Engineering", description: "Department of Engineering" },
          { id: "4", nom: "Mathematics", description: "Department of Mathematics" },
          { id: "5", nom: "Physics", description: "Department of Physics" },
        ];
        setDepartments(initialDepartments);
        sessionStorage.setItem("departments", JSON.stringify(initialDepartments));
      }
    }
  }, [navigate]);

  // Save departments to session storage whenever they change
  useEffect(() => {
    if (departments.length > 0) {
      sessionStorage.setItem("departments", JSON.stringify(departments));
    }
  }, [departments]);

  const handleAddDepartment = async () => {
    try {
      const token = await getKeycloakToken();
      const response = await fetch("/departement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDepartment),
      });

      if (response.ok) {
        const addedDepartment = await response.json();
        setDepartments([...departments, addedDepartment]);
        setNewDepartment({ nom: "", description: "" });
        setIsAddDialogOpen(false);
        toast.success("Department added successfully!");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du département :", error);
    }
  };












  const handleEditDepartment = async () => {
    if (!selectedDepartment) return;
    try {
      const token = await getKeycloakToken();
      const response = await fetch(`/departement/${selectedDepartment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedDepartment),
      });

      if (response.ok) {
        const updatedDepartment = await response.json();
        setDepartments(
          departments.map((department) =>
            department.id === updatedDepartment.id ? updatedDepartment : department
          )
        );
        setSelectedDepartment(null);
        setIsEditDialogOpen(false);
        toast.success("Department updated successfully!");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du département :", error);
    }
  };







  
  const handleDeleteDepartment = async () => {
    if (!selectedDepartment) return;
    try {
      const token = await getKeycloakToken();
      const response = await fetch(`/departement/${selectedDepartment.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setDepartments(
          departments.filter((department) => department.id !== selectedDepartment.id)
        );
        setSelectedDepartment(null);
        setIsDeleteDialogOpen(false);
        toast.success("Department deleted successfully!");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du département :", error);
    }
  };


  const openEditDialog = (department: Department) => {
    setSelectedDepartment(department);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (department: Department) => {
    setSelectedDepartment(department);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Departments" />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </div>

            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell className="font-medium">{department.id}</TableCell>
                      <TableCell>{department.nom}</TableCell>
                      <TableCell>{department.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(department)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500" onClick={() => openDeleteDialog(department)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Add Department Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Department</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new department.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nom">Department Nom</Label>
                    <Input
                      id="nom"
                      value={newDepartment.nom}
                      onChange={(e) => setNewDepartment({ ...newDepartment, nom: e.target.value })}
                      placeholder="Enter department nom"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Department Description</Label>
                    <Input
                      id="description"
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
                      placeholder="Enter department description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleAddDepartment}>Add Department</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Department Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Department</DialogTitle>
                  <DialogDescription>
                    Update the department details.
                  </DialogDescription>
                </DialogHeader>
                {selectedDepartment && (
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit-nom">Department Nom</Label>
                      <Input
                        id="edit-nom"
                        value={selectedDepartment.nom}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, nom: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit-description">Department Description</Label>
                      <Input
                        id="edit-description"
                        value={selectedDepartment.description}
                        onChange={(e) => setSelectedDepartment({ ...selectedDepartment, description: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleEditDepartment}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Delete Department Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Department</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this department? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                {selectedDepartment && (
                  <div className="py-4">
                    <p><strong>ID:</strong> {selectedDepartment.id}</p>
                    <p><strong>Nom:</strong> {selectedDepartment.nom}</p>
                    <p><strong>Description:</strong> {selectedDepartment.description}</p>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteDepartment}>Delete</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DepartmentsPage;
