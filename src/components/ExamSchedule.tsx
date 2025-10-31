import React, { useState } from 'react';
import { Plus, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';

interface ExamScheduleProps {
  onNavigate: (page: string) => void;
}

const exams = [
  { id: '1', name: 'Mid-Term Examination', subject: 'Mathematics', class: 'Class 10-A', date: '2025-10-20', time: '09:00 AM - 12:00 PM', duration: '3 hours', totalMarks: 100 },
  { id: '2', name: 'Mid-Term Examination', subject: 'Science', class: 'Class 9-B', date: '2025-10-22', time: '10:00 AM - 01:00 PM', duration: '3 hours', totalMarks: 100 },
  { id: '3', name: 'Mid-Term Examination', subject: 'English', class: 'Class 8-C', date: '2025-10-24', time: '11:00 AM - 02:00 PM', duration: '3 hours', totalMarks: 100 },
  { id: '4', name: 'Final Examination', subject: 'History', class: 'Class 11-A', date: '2025-11-15', time: '02:00 PM - 05:00 PM', duration: '3 hours', totalMarks: 100 },
  { id: '5', name: 'Final Examination', subject: 'Geography', class: 'Class 9-A', date: '2025-11-18', time: '09:00 AM - 12:00 PM', duration: '3 hours', totalMarks: 100 },
];

export default function ExamSchedule({ onNavigate }: ExamScheduleProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Exam scheduled successfully!');
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Exam Schedule</h1>
          <p className="text-gray-600">Manage examination schedules and dates</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Exam
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="examName">Exam Name *</Label>
                  <Input id="examName" placeholder="e.g., Mid-Term Examination" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      <SelectItem value="9-B">Class 9-B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Exam Date *</Label>
                  <Input id="date" type="date" required />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input id="startTime" type="time" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (hours) *</Label>
                  <Input id="duration" type="number" placeholder="3" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks *</Label>
                  <Input id="totalMarks" type="number" placeholder="100" required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Schedule Exam
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {exams.map((exam) => (
          <Card key={exam.id} className="border-gray-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2">{exam.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          {exam.subject}
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {exam.class}
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {exam.totalMarks} Marks
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Duration: {exam.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
