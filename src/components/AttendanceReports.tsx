import React from 'react';
import { Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

interface AttendanceReportsProps {
  onNavigate: (page: string) => void;
}

const monthlyData = [
  { month: 'Jan', rate: 92 },
  { month: 'Feb', rate: 89 },
  { month: 'Mar', rate: 94 },
  { month: 'Apr', rate: 91 },
  { month: 'May', rate: 95 },
  { month: 'Jun', rate: 93 },
];

const classWiseData = [
  { class: '10-A', present: 42, absent: 3, rate: 93.3 },
  { class: '10-B', present: 40, absent: 2, rate: 95.2 },
  { class: '9-A', present: 45, absent: 3, rate: 93.8 },
  { class: '9-B', present: 43, absent: 3, rate: 93.5 },
];

const studentAttendance = [
  { name: 'Emily Johnson', rollNo: '2023001', present: 95, absent: 5, rate: 95.0, trend: 'up' },
  { name: 'Michael Chen', rollNo: '2023002', present: 92, absent: 8, rate: 92.0, trend: 'up' },
  { name: 'Sarah Williams', rollNo: '2023003', present: 88, absent: 12, rate: 88.0, trend: 'down' },
  { name: 'David Brown', rollNo: '2023004', present: 90, absent: 10, rate: 90.0, trend: 'up' },
];

export default function AttendanceReports({ onNavigate }: AttendanceReportsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Attendance Reports</h1>
          <p className="text-gray-600">View and analyze attendance statistics</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="current">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Month</SelectItem>
              <SelectItem value="last">Last Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Monthly Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Class-wise Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classWiseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="class" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Class-wise Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classWiseData.map((cls) => (
              <div key={cls.class}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900">Class {cls.class}</span>
                  <span className="text-sm text-gray-600">{cls.rate}%</span>
                </div>
                <Progress value={cls.rate} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Student-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentAttendance.map((student) => (
                <TableRow key={student.rollNo}>
                  <TableCell className="text-sm text-gray-900">{student.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">{student.rollNo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {student.present}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
                      {student.absent}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.rate} className="w-20" />
                      <span className="text-sm text-gray-600">{student.rate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {student.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
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
