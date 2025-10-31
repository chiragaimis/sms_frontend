import React from 'react';
import { Download, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface ResultsDashboardProps {
  onNavigate: (page: string) => void;
}

const gradeDistribution = [
  { grade: 'A+', count: 15, color: '#10b981' },
  { grade: 'A', count: 25, color: '#3b82f6' },
  { grade: 'B', count: 30, color: '#f59e0b' },
  { grade: 'C', count: 20, color: '#f97316' },
  { grade: 'D', count: 8, color: '#ef4444' },
  { grade: 'F', count: 2, color: '#991b1b' },
];

const subjectPerformance = [
  { subject: 'Math', average: 85 },
  { subject: 'Science', average: 88 },
  { subject: 'English', average: 82 },
  { subject: 'History', average: 79 },
  { subject: 'Geography', average: 84 },
];

const topStudents = [
  { rank: 1, name: 'Emily Johnson', rollNo: '2023001', average: 98.5, grade: 'A+' },
  { rank: 2, name: 'Michael Chen', rollNo: '2023002', average: 97.8, grade: 'A+' },
  { rank: 3, name: 'Sarah Williams', rollNo: '2023003', average: 96.9, grade: 'A+' },
  { rank: 4, name: 'David Brown', rollNo: '2023004', average: 96.2, grade: 'A+' },
  { rank: 5, name: 'Jessica Davis', rollNo: '2023005', average: 95.8, grade: 'A+' },
];

export default function ResultsDashboard({ onNavigate }: ResultsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Results Dashboard</h1>
          <p className="text-gray-600">View and analyze student performance and results</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="mid">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mid">Mid-Term Results</SelectItem>
              <SelectItem value="final">Final Results</SelectItem>
              <SelectItem value="annual">Annual Results</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                +5.2%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <p className="text-gray-900">84.5%</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                Top 10%
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Pass Rate</p>
            <p className="text-gray-900">98%</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                A+ Grade
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">Top Scorer</p>
            <p className="text-sm text-gray-900">Emily Johnson</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ grade, count }) => `${grade}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Subject-wise Average</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="subject" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="average" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            Top Performers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Average Score</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topStudents.map((student) => (
                <TableRow key={student.rank}>
                  <TableCell>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      student.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                      student.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      student.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      #{student.rank}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{student.name}</TableCell>
                  <TableCell className="text-sm text-gray-700">{student.rollNo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={student.average} className="w-20" />
                      <span className="text-sm text-gray-900">{student.average}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {student.grade}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Report Card
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
