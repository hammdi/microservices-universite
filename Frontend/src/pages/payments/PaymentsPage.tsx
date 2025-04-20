
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

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: "pending" | "completed" | "failed";
}

const PaymentsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [newPayment, setNewPayment] = useState<Omit<Payment, "id">>({
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    status: "pending",
  });
  const [editPayment, setEditPayment] = useState<Payment | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    // Load mock data from sessionStorage or initialize with sample data
    const storedPayments = sessionStorage.getItem("payments");
    if (storedPayments) {
      setPayments(JSON.parse(storedPayments));
    } else {
      const samplePayments: Payment[] = [
        {
          id: "1",
          amount: 500,
          date: "2023-04-15",
          status: "completed",
        },
        {
          id: "2",
          amount: 750,
          date: "2023-05-20",
          status: "pending",
        },
        {
          id: "3",
          amount: 1000,
          date: "2023-06-10",
          status: "failed",
        },
      ];
      setPayments(samplePayments);
      sessionStorage.setItem("payments", JSON.stringify(samplePayments));
    }
  }, [navigate]);

  const handleAddPayment = () => {
    const id = Math.random().toString(36).substring(2, 9);
    const paymentToAdd = { id, ...newPayment };
    const updatedPayments = [...payments, paymentToAdd];
    
    setPayments(updatedPayments);
    sessionStorage.setItem("payments", JSON.stringify(updatedPayments));
    
    setNewPayment({
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      status: "pending",
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Payment Added",
      description: `Payment of €${paymentToAdd.amount} has been added successfully`,
    });
  };

  const handleEditPayment = () => {
    if (!editPayment) return;
    
    const updatedPayments = payments.map((payment) =>
      payment.id === editPayment.id ? editPayment : payment
    );
    
    setPayments(updatedPayments);
    sessionStorage.setItem("payments", JSON.stringify(updatedPayments));
    
    setEditPayment(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Payment Updated",
      description: `Payment ID ${editPayment.id} has been updated successfully`,
    });
  };

  const handleDeletePayment = () => {
    if (!paymentToDelete) return;
    
    const updatedPayments = payments.filter((payment) => payment.id !== paymentToDelete.id);
    
    setPayments(updatedPayments);
    sessionStorage.setItem("payments", JSON.stringify(updatedPayments));
    
    setPaymentToDelete(null);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Payment Deleted",
      description: `Payment ID ${paymentToDelete.id} has been removed from the system`,
    });
  };

  const getStatusClass = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
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
                      <Label htmlFor="amount">Amount (€)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({ ...newPayment, amount: Number(e.target.value) })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newPayment.date}
                        onChange={(e) => setNewPayment({ ...newPayment, date: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        onValueChange={(value: "pending" | "completed" | "failed") => 
                          setNewPayment({ ...newPayment, status: value })
                        }
                        defaultValue={newPayment.status}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
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
                  View and manage all payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.length > 0 ? (
                      payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>€{payment.amount.toFixed(2)}</TableCell>
                          <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusClass(payment.status)}`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right space-x-2">
                            <Dialog open={isEditDialogOpen && editPayment?.id === payment.id} onOpenChange={(open) => {
                              setIsEditDialogOpen(open);
                              if (!open) setEditPayment(null);
                            }}>
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
                                    Update the payment information below.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {editPayment && (
                                  <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-amount">Amount (€)</Label>
                                      <Input
                                        id="edit-amount"
                                        type="number"
                                        value={editPayment.amount}
                                        onChange={(e) => setEditPayment({ ...editPayment, amount: Number(e.target.value) })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-date">Date</Label>
                                      <Input
                                        id="edit-date"
                                        type="date"
                                        value={editPayment.date}
                                        onChange={(e) => setEditPayment({ ...editPayment, date: e.target.value })}
                                      />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label htmlFor="edit-status">Status</Label>
                                      <Select
                                        onValueChange={(value: "pending" | "completed" | "failed") => 
                                          setEditPayment({ ...editPayment, status: value })
                                        }
                                        defaultValue={editPayment.status}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select payment status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="pending">Pending</SelectItem>
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={handleEditPayment}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            
                            <Dialog open={isDeleteDialogOpen && paymentToDelete?.id === payment.id} onOpenChange={(open) => {
                              setIsDeleteDialogOpen(open);
                              if (!open) setPaymentToDelete(null);
                            }}>
                              <DialogTrigger asChild>
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
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Delete Payment</DialogTitle>
                                  <DialogDescription>
                                    Are you sure you want to delete this payment? This action cannot be undone.
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {paymentToDelete && (
                                  <div className="py-4">
                                    <p className="mb-2">Payment ID: {paymentToDelete.id}</p>
                                    <p className="text-sm text-gray-500">Amount: €{paymentToDelete.amount.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">Date: {new Date(paymentToDelete.date).toLocaleDateString()}</p>
                                  </div>
                                )}
                                
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button variant="destructive" onClick={handleDeletePayment}>
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
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
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
