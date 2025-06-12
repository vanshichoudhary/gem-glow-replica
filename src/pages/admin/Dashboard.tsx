
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  // Fetch basic stats from profiles table
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [adminRes, customerRes] = await Promise.all([
        supabase.from('profiles').select('id').eq('role', 'admin'),
        supabase.from('profiles').select('id').eq('role', 'customer')
      ]);

      const totalAdmins = adminRes.data?.length || 0;
      const totalCustomers = customerRes.data?.length || 0;

      return {
        totalSales: 0, // Placeholder until orders table is created
        totalOrders: 0, // Placeholder until orders table is created
        totalCustomers,
        totalAdmins
      };
    }
  });

  // Fetch recent users
  const { data: recentUsers } = useQuery({
    queryKey: ['recent-users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const statsCards = [
    { 
      title: 'Total Sales', 
      value: formatCurrency(stats?.totalSales || 0), 
      change: '+0%', 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      title: 'Orders', 
      value: stats?.totalOrders?.toString() || '0', 
      change: '+0%', 
      icon: ShoppingCart, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Customers', 
      value: stats?.totalCustomers?.toString() || '0', 
      change: '+0%', 
      icon: Users, 
      color: 'text-purple-600' 
    },
    { 
      title: 'Admins', 
      value: stats?.totalAdmins?.toString() || '0', 
      change: '+0%', 
      icon: Package, 
      color: 'text-orange-600' 
    },
  ];

  if (statsLoading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Export Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.change} from last month</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Notice for missing tables */}
      <Card>
        <CardHeader>
          <CardTitle>Setup Required</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            To enable full dashboard functionality, you'll need to create the following database tables:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Products table (for inventory management)</li>
            <li>Orders table (for sales tracking)</li>
            <li>Order items table (for order details)</li>
          </ul>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">#{user.id.slice(0, 8)}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
