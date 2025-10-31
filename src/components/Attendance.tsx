import React, { useState } from 'react';
import { Calendar, Save, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { toast } from 'sonner';

interface AttendanceProps {
  onNavigate: (page: string) => void;
}

const students = [
  { id: '1', name: 'Emily Johnson', rollNo: '2023001' },
  { id: '2', name: 'Michael Chen', rollNo: '2023002' },
  { id: '3', name: 'Sarah Williams', rollNo: '2023003' },
  { id: '4', name: 'David Brown', rollNo: '2023004' },
  { id: '5', name: 'Jessica Davis', rollNo: '2023005' },
  { id: '6', name: 'James Wilson', rollNo: '2023006' },
  { id: '7', name: 'Emma Martinez', rollNo: '2023007' },
  { id: '8', name: 'Daniel Garcia', rollNo: '2023008' },
];

export default function Attendance({ onNavigate }: AttendanceProps) {
  const [selectedDate, setSelectedDate] = useState('2025-10-15');
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const handleSubmit = () => {
    toast.success('Attendance saved successfully!');
  };

  const toggleAttendance = (studentId: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    students.forEach(student => {
      allPresent[student.id] = true;
    });
    setAttendance(allPresent);
    toast.success('Marked all students as present');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Mark Attendance</h1>
          <p className="text-gray-600">Record daily student attendance</p>
        </div>
        <Button onClick={() => onNavigate('attendance-reports')} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          View Reports
        </Button>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Attendance Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-A">Class 10-A</SelectItem>
                  <SelectItem value="10-B">Class 10-B</SelectItem>
                  <SelectItem value="9-A">Class 9-A</SelectItem>
                  <SelectItem value="9-B">Class 9-B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={markAllPresent} variant="outline" className="w-full">
                Mark All Present
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student List - Class {selectedClass}</CardTitle>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Present: <span className="text-green-600">{Object.values(attendance).filter(Boolean).length}</span>
              </span>
              <span className="text-sm text-gray-600">
                Absent: <span className="text-red-600">{students.length - Object.values(attendance).filter(Boolean).length}</span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`student-${student.id}`}
                    checked={attendance[student.id] || false}
                    onCheckedChange={() => toggleAttendance(student.id)}
                  />
                  <label htmlFor={`student-${student.id}`} className="cursor-pointer">
                    {/* <p className="text-sm text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-500">Roll No: {student.rollNo}</p> */}
                    <p className="text-sm text-gray-900">Name: {student.name}</p>
                    <p className="text-sm text-gray-700">Roll No: {student.rollNo}</p>
                  </label>
                </div>
                <Badge
                  variant="outline"
                  className={attendance[student.id] ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
                >
                  {attendance[student.id] ? 'Present' : 'Absent'}
                </Badge>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save Attendance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
