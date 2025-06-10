
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertTriangle, Package, TrendingDown } from 'lucide-react';

const Inventory = () => {
  // Mock inventory data
  const lowStockItems = [
    { id: 1, name: 'Pearl Earrings', category: 'Earrings', stock: 5, minStock: 10, price: 149 },
    { id: 2, name: 'Ruby Ring', category: 'Rings', stock: 3, minStock: 8, price: 799 },
    { id: 3, name: 'Gold Anklet', category: 'Anklets', stock: 2, minStock: 5, price: 199 },
  ];

  const outOfStockItems = [
    { id: 1, name: 'Silver Bracelet', category: 'Bracelets', stock: 0, price: 99 },
    { id: 2, name: 'Emerald Necklace', category: 'Necklaces', stock: 0, price: 1299 },
  ];

  const inventoryStats = [
    { title: 'Total Products', value: '432', icon: Package, color: 'text-blue-600' },
    { title: 'Low Stock Items', value: '8', icon: AlertTriangle, color: 'text-yellow-600' },
    { title: 'Out of Stock', value: '3', icon: TrendingDown, color: 'text-red-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button>Generate Stock Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {inventoryStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Stock Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            Low Stock Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lowStockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-yellow-600">
                      {item.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.minStock}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Restock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Out of Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-red-600" />
            Out of Stock Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outOfStockItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Restock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
