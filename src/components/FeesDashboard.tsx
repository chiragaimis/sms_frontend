import React from 'react';
import { DollarSign, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface FeesDashboardProps {
  onNavigate: (page: string) => void;
}

const monthlyRevenue = [
  { month: 'Jan', collected: 42000, expected: 45000 },
  { month: 'Feb', collected: 38000, expected: 45000 },
  { month: 'Mar', collected: 44000, expected: 45000 },
  { month: 'Apr', collected: 40000, expected: 45000 },
  { month: 'May', collected: 47000, expected: 45000 },
  { month: 'Jun', collected: 43000, expected: 45000 },
];

const pendingPayments = [
  { name: 'Sarah Williams', rollNo: '2023003', class: 'Class 10-A', amount: 500, dueDate: '2025-10-20', overdue: false },
  { name: 'James Wilson', rollNo: '2023006', class: 'Class 8-C', amount: 500, dueDate: '2025-10-10', overdue: true },
  { name: 'Daniel Garcia', rollNo: '2023008', class: 'Class 11-B', amount: 500, dueDate: '2025-10-25', overdue: false },
];

export default function FeesDashboard({ onNavigate }: FeesDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Fees Dashboard</h1>
          <p className="text-gray-600">Overview of fee collection and payments</p>
        </div>
        <Button onClick={() => onNavigate('payment-form')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Add Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Total Collected</p>
            <p className="text-gray-900">$254,000</p>
            <p className="text-xs text-green-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-gray-900">$12,500</p>
            <p className="text-xs text-yellow-600 mt-1">15 students</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Overdue</p>
            <p className="text-gray-900">$3,500</p>
            <p className="text-xs text-red-600 mt-1">7 students</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Collection Rate</p>
            <p className="text-gray-900">95.3%</p>
            <Progress value={95.3} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2} />
                <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Collection by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="collected" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              Pending Payments
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => onNavigate('transactions')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments.map((payment) => (
                <TableRow key={payment.rollNo}>
                  <TableCell className="text-sm text-gray-900">{payment.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">{payment.rollNo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {payment.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-900">${payment.amount}</TableCell>
                  <TableCell className="text-sm text-gray-700">{payment.dueDate}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={payment.overdue ? 'bg-red-100 text-red-700 border-red-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}>
                      {payment.overdue ? 'Overdue' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">
                      Send Reminder
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
}
