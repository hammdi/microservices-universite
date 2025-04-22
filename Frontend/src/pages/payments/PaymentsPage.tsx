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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Trash2, Plus } from "lucide-react";
import { getKeycloakToken } from "@/services/authService";

interface Payment {
  id: string;
  studentId: string;
  amount: number;
  paymentType: "TUITION" | "LIBRARY" | "LABORATORY" | "OTHER";
  paymentDate: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}

const PaymentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Omit<Payment, "id">>({
    studentId: "",
    amount: 0,
    paymentType: "TUITION",
    paymentDate: new Date().toISOString().split("T")[0],
    status: "PENDING",
  });
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);

  const API_URL = "/api/payments";

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = await getKeycloakToken();
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Mappez les paiements pour convertir `_id` en `id`
          const mappedPayments = data.map((payment: any) => ({
            ...payment,
            id: payment._id,
          }));
          setPayments(mappedPayments);
        } else {
          throw new Error("Failed to fetch payments");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des paiements :", error);
      }
    };

    fetchPayments();

    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleAddPayment = async () => {
    try {
      const token = await getKeycloakToken();
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPayment),
      });
      if (response.ok) {
        const addedPayment = await response.json();
        setPayments([...payments, addedPayment]);
        setNewPayment({
          studentId: "",
          amount: 0,
          paymentType: "TUITION",
          paymentDate: new Date().toISOString().split("T")[0],
          status: "PENDING",
        });
        setIsAddDialogOpen(false);
        toast({
          title: "Payment Added",
          description: `Payment of €${addedPayment.amount} has been added successfully`,
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement :", error);
    }
  };

  const handleEditPayment = async () => {
    if (!editPayment || !editPayment.id) {
      console.error("EditPayment ou ID manquant :", editPayment);
      return;
    }
  
    console.log("Données à mettre à jour :", editPayment);
  
    try {
      const token = await getKeycloakToken();
      const response = await fetch(`${API_URL}/${editPayment.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editPayment),
      });
  
      console.log("Réponse du serveur :", response);
  
      if (response.ok) {
        const updatedPayment = await response.json();
        console.log("Paiement mis à jour :", updatedPayment);
  
        // Mapper `_id` en `id` pour le paiement mis à jour
        const mappedPayment = { ...updatedPayment, id: updatedPayment._id };
  
        setPayments(
          payments.map((payment) =>
            payment.id === mappedPayment.id ? mappedPayment : payment
          )
        );
        setEditPayment(null);
        setIsEditDialogOpen(false);
        toast({
          title: "Payment Updated",
          description: `Payment ID ${mappedPayment.id} has been updated successfully`,
        });
      } else {
        console.error("Erreur lors de la mise à jour :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du paiement :", error);
    }
  };

  const handleDeletePayment = async () => {
    if (!paymentToDelete || !paymentToDelete.id) return;

    try {
      const token = await getKeycloakToken();
      const response = await fetch(`${API_URL}/${paymentToDelete.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPayments(payments.filter((payment) => payment.id !== paymentToDelete.id));
        setPaymentToDelete(null);
        setIsDeleteDialogOpen(false);
        toast({
          title: "Payment Deleted",
          description: `Payment ID ${paymentToDelete.id} has been removed successfully.`,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du paiement :", error);
      toast({
        title: "Error",
        description: "Failed to delete payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Payments Management" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Payments</h1>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus size={16} />
                    Add New Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Payment</DialogTitle>
                    <DialogDescription>
                      Fill out the form below to record a new payment.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        placeholder="Enter student ID"
                        value={newPayment.studentId}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, studentId: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount (€)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newPayment.amount}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, amount: Number(e.target.value) })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="paymentType">Payment Type</Label>
                      <Select
                        onValueChange={(value: Payment["paymentType"]) =>
                          setNewPayment({ ...newPayment, paymentType: value })
                        }
                        defaultValue={newPayment.paymentType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TUITION">Tuition</SelectItem>
                          <SelectItem value="LIBRARY">Library</SelectItem>
                          <SelectItem value="LABORATORY">Laboratory</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="paymentDate">Payment Date</Label>
                      <Input
                        id="paymentDate"
                        type="date"
                        value={newPayment.paymentDate}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, paymentDate: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(value: Payment["status"]) =>
                          setNewPayment({ ...newPayment, status: value })
                        }
                        defaultValue={newPayment.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PENDING">Pending</SelectItem>
                          <SelectItem value="COMPLETED">Completed</SelectItem>
                          <SelectItem value="FAILED">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddPayment}>Add Payment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Card className="shadow-sm">
              <CardHeader className="bg-gray-50 border-b p-4">
                <CardTitle className="text-lg">Payment Records</CardTitle>
                <CardDescription>
                  View and manage all payment transactions.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Amount (€)</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length > 0 ? (
                      payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.studentId}</TableCell>
                          <TableCell>€{payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{payment.paymentType}</TableCell>
                          <TableCell>
                            {new Date(payment.paymentDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{payment.status}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Dialog
                              open={isEditDialogOpen && editPayment?.id === payment.id}
                              onOpenChange={(open) => {
                                if (!open) {
                                  setIsEditDialogOpen(false);
                                  setEditPayment(null);
                                }
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditPayment(payment);
                                    setIsEditDialogOpen(true);
                                  }}
                                >
                                  <Pencil size={16} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Edit Payment</DialogTitle>
                                  <DialogDescription>
                                    Update the details of the selected payment.
                                  </DialogDescription>
                                </DialogHeader>
                                {editPayment && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="studentId">Student ID</Label>
                                      <Input
                                        id="studentId"
                                        placeholder="Enter student ID"
                                        value={editPayment.studentId}
                                        onChange={(e) =>
                                          setEditPayment({
                                            ...editPayment,
                                            studentId: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="amount">Amount (€)</Label>
                                      <Input
                                        id="amount"
                                        type="number"
                                        placeholder="Enter amount"
                                        value={editPayment.amount}
                                        onChange={(e) =>
                                          setEditPayment({
                                            ...editPayment,
                                            amount: Number(e.target.value),
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="paymentType">Payment Type</Label>
                                      <Select
                                        onValueChange={(value: Payment["paymentType"]) =>
                                          setEditPayment({
                                            ...editPayment,
                                            paymentType: value,
                                          })
                                        }
                                        defaultValue={editPayment.paymentType}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select payment type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="TUITION">Tuition</SelectItem>
                                          <SelectItem value="LIBRARY">Library</SelectItem>
                                          <SelectItem value="LABORATORY">
                                            Laboratory
                                          </SelectItem>
                                          <SelectItem value="OTHER">Other</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="paymentDate">Payment Date</Label>
                                      <Input
                                        id="paymentDate"
                                        type="date"
                                        value={editPayment.paymentDate}
                                        onChange={(e) =>
                                          setEditPayment({
                                            ...editPayment,
                                            paymentDate: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="status">Status</Label>
                                      <Select
                                        onValueChange={(value: Payment["status"]) =>
                                          setEditPayment({
                                            ...editPayment,
                                            status: value,
                                          })
                                        }
                                        defaultValue={editPayment.status}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select payment status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="PENDING">Pending</SelectItem>
                                          <SelectItem value="COMPLETED">Completed</SelectItem>
                                          <SelectItem value="FAILED">Failed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                )}
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditPayment}>
                                    Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setPaymentToDelete(payment);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                            <Dialog
                              open={
                                isDeleteDialogOpen &&
                                paymentToDelete?.id === payment.id
                              }
                              onOpenChange={(open) => {
                                setIsDeleteDialogOpen(open);
                                if (!open) setPaymentToDelete(null);
                              }}
                            >
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Payment</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to remove this payment? This
                                    action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleDeletePayment}
                                  >
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
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-gray-500"
                        >
                          No payments found. Add your first payment to get started.
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

export default PaymentsPage;