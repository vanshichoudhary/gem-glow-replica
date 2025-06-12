
import React, { useEffect, useState } from 'react';
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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [ordersRes, customersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('total_amount, created_at'),
        supabase.from('profiles').select('id').eq('role', 'customer'),
        supabase.from('products').select('id, stock_quantity')
      ]);

      const totalSales = ordersRes.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const totalOrders = ordersRes.data?.length || 0;
      const totalCustomers = customersRes.data?.length || 0;
      const totalProducts = productsRes.data?.length || 0;

      return {
        totalSales,
        totalOrders,
        totalCustomers,
        totalProducts
      };
    }
  });

  // Fetch recent orders
  const { data: recentOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id,
          total_amount,
          status,
          created_at,
          profiles(full_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data;
    }
  });

  // Fetch products by category for pie chart
  const { data: categoryData } = useQuery({
    queryKey: ['products-by-category'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw error;

      const categoryCounts = data.reduce((acc: any, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F'];
      
      return Object.entries(categoryCounts).map(([name, value], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color: colors[index % colors.length]
      }));
    }
  });

  // Mock sales data for line chart (you can implement this with real data later)
  const salesData = [
    { day: 'Mon', sales: 1200 },
    { day: 'Tue', sales: 1900 },
    { day: 'Wed', sales: 3000 },
    { day: 'Thu', sales: 5000 },
    { day: 'Fri', sales: 4000 },
    { day: 'Sat', sales: 3000 },
    { day: 'Sun', sales: 2000 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
      change: '+12%', 
      icon: DollarSign, 
      color: 'text-green-600' 
    },
    { 
      title: 'Orders', 
      value: stats?.totalOrders?.toString() || '0', 
      change: '+8%', 
      icon: ShoppingCart, 
      color: 'text-blue-600' 
    },
    { 
      title: 'Customers', 
      value: stats?.totalCustomers?.toString() || '0', 
      change: '+15%', 
      icon: Users, 
      color: 'text-purple-600' 
    },
    { 
      title: 'Products', 
      value: stats?.totalProducts?.toString() || '0', 
      change: '+3%', 
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData || []}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {(categoryData || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id.slice(0, 8)}</TableCell>
                  <TableCell>{order.profiles?.full_name || order.profiles?.email}</TableCell>
                  <TableCell>{formatCurrency(Number(order.total_amount))}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">View</Button>
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

export default Dashboard;
