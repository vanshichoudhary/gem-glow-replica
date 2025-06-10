
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, UserCheck, Shield } from 'lucide-react';

const UserRoles = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Super Admin',
      status: 'Active',
      lastLogin: '2024-01-15',
      permissions: ['all']
    },
    {
      id: 2,
      name: 'John Manager',
      email: 'john.manager@example.com',
      role: 'Staff',
      status: 'Active',
      lastLogin: '2024-01-14',
      permissions: ['products', 'orders', 'customers']
    },
    {
      id: 3,
      name: 'Mike Worker',
      email: 'mike.worker@example.com',
      role: 'Warehouse',
      status: 'Active',
      lastLogin: '2024-01-13',
      permissions: ['inventory', 'orders']
    }
  ];

  const roles = [
    {
      name: 'Super Admin',
      description: 'Full access to all features',
      permissions: ['Dashboard', 'Products', 'Orders', 'Customers', 'Inventory', 'Coupons', 'Reports', 'User Management'],
      userCount: 1
    },
    {
      name: 'Staff',
      description: 'Manage products, orders, and customers',
      permissions: ['Dashboard', 'Products', 'Orders', 'Customers', 'Reports'],
      userCount: 3
    },
    {
      name: 'Warehouse',
      description: 'Manage inventory and orders',
      permissions: ['Dashboard', 'Inventory', 'Orders'],
      userCount: 2
    }
  ];

  const permissions = [
    'Dashboard', 'Products', 'Orders', 'Customers', 'Inventory', 'Coupons', 'Reports', 'User Management'
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'bg-red-100 text-red-800';
      case 'Staff': return 'bg-blue-100 text-blue-800';
      case 'Warehouse': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Role Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account with specific role and permissions.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role.name} value={role.name}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Temporary Password</Label>
                <Input id="password" type="password" placeholder="Enter password" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Add User</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roles.map((role, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {role.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
              <p className="text-sm mb-2"><strong>Users:</strong> {role.userCount}</p>
              <div className="space-y-1">
                <p className="text-sm font-medium">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map(permission => (
                    <Badge key={permission} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Reset Password
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Role</th>
                  {permissions.map(permission => (
                    <th key={permission} className="text-center p-2 border-b text-xs">
                      {permission}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map(role => (
                  <tr key={role.name}>
                    <td className="p-2 border-b font-medium">{role.name}</td>
                    {permissions.map(permission => (
                      <td key={permission} className="text-center p-2 border-b">
                        <Checkbox 
                          checked={role.permissions.includes(permission)} 
                          readOnly 
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRoles;
