import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { toast } from 'sonner';

interface MarksEntryProps {
  onNavigate: (page: string) => void;
}

const students = [
  { id: '1', name: 'Emily Johnson', rollNo: '2023001' },
  { id: '2', name: 'Michael Chen', rollNo: '2023002' },
  { id: '3', name: 'Sarah Williams', rollNo: '2023003' },
  { id: '4', name: 'David Brown', rollNo: '2023004' },
  { id: '5', name: 'Jessica Davis', rollNo: '2023005' },
];

export default function MarksEntry({ onNavigate }: MarksEntryProps) {
  const [marks, setMarks] = useState<Record<string, string>>({});

  const handleMarksChange = (studentId: string, value: string) => {
    setMarks(prev => ({ ...prev, [studentId]: value }));
  };

  const handleSubmit = () => {
    toast.success('Marks saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Enter Marks</h1>
        <p className="text-gray-600">Record student exam marks and grades</p>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Exam Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="exam">Select Exam *</Label>
              <Select>
                <SelectTrigger id="exam">
                  <SelectValue placeholder="Select Exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Mid-Term - Mathematics</SelectItem>
                  <SelectItem value="2">Mid-Term - Science</SelectItem>
                  <SelectItem value="3">Final - English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-A">Class 10-A</SelectItem>
                  <SelectItem value="10-B">Class 10-B</SelectItem>
                  <SelectItem value="9-A">Class 9-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks</Label>
              <Input id="totalMarks" type="number" value="100" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Student Marks Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Marks Obtained</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => {
                const mark = parseInt(marks[student.id] || '0');
                const grade = mark >= 90 ? 'A+' : mark >= 80 ? 'A' : mark >= 70 ? 'B' : mark >= 60 ? 'C' : mark >= 50 ? 'D' : 'F';
                return (
                  <TableRow key={student.id}>
                    <TableCell className="text-sm text-gray-700">{student.rollNo}</TableCell>
                    <TableCell className="text-sm text-gray-900">{student.name}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={marks[student.id] || ''}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-24"
                        placeholder="0"
                      />
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center justify-center w-12 h-8 rounded text-sm ${
                        grade === 'A+' || grade === 'A' ? 'bg-green-100 text-green-700' :
                        grade === 'B' || grade === 'C' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {mark > 0 ? grade : '-'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        placeholder="Optional"
                        className="w-full"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Save className="w-4 h-4 mr-2" />
              Save Marks
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
