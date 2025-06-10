
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, Eye } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      totalSpent: 1298,
      orderCount: 5,
      joinDate: '2023-08-15',
      orders: [
        { id: '#001', date: '2024-01-15', amount: 898, status: 'Delivered' },
        { id: '#005', date: '2024-01-10', amount: 400, status: 'Delivered' }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      totalSpent: 847,
      orderCount: 3,
      joinDate: '2023-09-20',
      orders: [
        { id: '#002', date: '2024-01-14', amount: 298, status: 'Pending' },
        { id: '#006', date: '2024-01-08', amount: 549, status: 'Delivered' }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      totalSpent: 1156,
      orderCount: 4,
      joinDate: '2023-07-10',
      orders: [
        { id: '#003', date: '2024-01-14', amount: 398, status: 'Processing' },
        { id: '#007', date: '2024-01-05', amount: 758, status: 'Delivered' }
      ]
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      totalSpent: 599,
      orderCount: 2,
      joinDate: '2023-11-05',
      orders: [
        { id: '#004', date: '2024-01-13', amount: 599, status: 'Canceled' }
      ]
    }
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <Button>Export Customers</Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>${customer.totalSpent}</TableCell>
                  <TableCell>{customer.orderCount}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Customer Details - {selectedCustomer?.name}</DialogTitle>
            <DialogDescription>Customer information and purchase history</DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <p><strong>Name:</strong> {selectedCustomer.name}</p>
                  <p><strong>Email:</strong> {selectedCustomer.email}</p>
                  <p><strong>Join Date:</strong> {selectedCustomer.joinDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Purchase Summary</h3>
                  <p><strong>Total Spent:</strong> ${selectedCustomer.totalSpent}</p>
                  <p><strong>Total Orders:</strong> {selectedCustomer.orderCount}</p>
                  <p><strong>Average Order:</strong> ${Math.round(selectedCustomer.totalSpent / selectedCustomer.orderCount)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Order History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedCustomer.orders.map((order: any) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.amount}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
