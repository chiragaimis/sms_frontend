import React from 'react';
import { Clock, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface TimetableProps {
  onNavigate: (page: string) => void;
}

const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-01:00', '01:00-02:00', '02:00-03:00', '03:00-04:00'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const timetableData: Record<string, Record<string, { subject: string; teacher: string; room: string }>> = {
  'Monday': {
    '09:00-10:00': { subject: 'Mathematics', teacher: 'Prof. John Smith', room: 'Room 101' },
    '10:00-11:00': { subject: 'Science', teacher: 'Dr. Sarah Anderson', room: 'Lab 1' },
    '11:00-12:00': { subject: 'English', teacher: 'Mrs. Emily Davis', room: 'Room 203' },
    '12:00-01:00': { subject: 'Lunch Break', teacher: '', room: '' },
    '01:00-02:00': { subject: 'History', teacher: 'Mr. Michael Brown', room: 'Room 105' },
    '02:00-03:00': { subject: 'Geography', teacher: 'Ms. Jennifer Wilson', room: 'Room 204' },
    '03:00-04:00': { subject: 'Physical Education', teacher: 'Mr. David Lee', room: 'Ground' },
  },
  'Tuesday': {
    '09:00-10:00': { subject: 'Science', teacher: 'Dr. Sarah Anderson', room: 'Lab 1' },
    '10:00-11:00': { subject: 'Mathematics', teacher: 'Prof. John Smith', room: 'Room 101' },
    '11:00-12:00': { subject: 'Computer Science', teacher: 'Mr. Robert Taylor', room: 'Lab 2' },
    '12:00-01:00': { subject: 'Lunch Break', teacher: '', room: '' },
    '01:00-02:00': { subject: 'English', teacher: 'Mrs. Emily Davis', room: 'Room 203' },
    '02:00-03:00': { subject: 'Art', teacher: 'Ms. Lisa Brown', room: 'Art Room' },
    '03:00-04:00': { subject: 'Music', teacher: 'Mr. James Wilson', room: 'Music Room' },
  },
  'Wednesday': {
    '09:00-10:00': { subject: 'Mathematics', teacher: 'Prof. John Smith', room: 'Room 101' },
    '10:00-11:00': { subject: 'History', teacher: 'Mr. Michael Brown', room: 'Room 105' },
    '11:00-12:00': { subject: 'Science', teacher: 'Dr. Sarah Anderson', room: 'Lab 1' },
    '12:00-01:00': { subject: 'Lunch Break', teacher: '', room: '' },
    '01:00-02:00': { subject: 'Geography', teacher: 'Ms. Jennifer Wilson', room: 'Room 204' },
    '02:00-03:00': { subject: 'English', teacher: 'Mrs. Emily Davis', room: 'Room 203' },
    '03:00-04:00': { subject: 'Library', teacher: '', room: 'Library' },
  },
  'Thursday': {
    '09:00-10:00': { subject: 'Science', teacher: 'Dr. Sarah Anderson', room: 'Lab 1' },
    '10:00-11:00': { subject: 'Mathematics', teacher: 'Prof. John Smith', room: 'Room 101' },
    '11:00-12:00': { subject: 'English', teacher: 'Mrs. Emily Davis', room: 'Room 203' },
    '12:00-01:00': { subject: 'Lunch Break', teacher: '', room: '' },
    '01:00-02:00': { subject: 'Computer Science', teacher: 'Mr. Robert Taylor', room: 'Lab 2' },
    '02:00-03:00': { subject: 'History', teacher: 'Mr. Michael Brown', room: 'Room 105' },
    '03:00-04:00': { subject: 'Physical Education', teacher: 'Mr. David Lee', room: 'Ground' },
  },
  'Friday': {
    '09:00-10:00': { subject: 'Mathematics', teacher: 'Prof. John Smith', room: 'Room 101' },
    '10:00-11:00': { subject: 'English', teacher: 'Mrs. Emily Davis', room: 'Room 203' },
    '11:00-12:00': { subject: 'Science', teacher: 'Dr. Sarah Anderson', room: 'Lab 1' },
    '12:00-01:00': { subject: 'Lunch Break', teacher: '', room: '' },
    '01:00-02:00': { subject: 'Geography', teacher: 'Ms. Jennifer Wilson', room: 'Room 204' },
    '02:00-03:00': { subject: 'Art', teacher: 'Ms. Lisa Brown', room: 'Art Room' },
    '03:00-04:00': { subject: 'Assembly', teacher: '', room: 'Hall' },
  },
};

const getSubjectColor = (subject: string) => {
  if (subject === 'Lunch Break') return 'bg-gray-100 text-gray-600 border-gray-300';
  if (subject.includes('Mathematics')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (subject.includes('Science')) return 'bg-green-50 text-green-700 border-green-200';
  if (subject.includes('English')) return 'bg-purple-50 text-purple-700 border-purple-200';
  if (subject.includes('History')) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
  if (subject.includes('Geography')) return 'bg-orange-50 text-orange-700 border-orange-200';
  return 'bg-pink-50 text-pink-700 border-pink-200';
};

export default function Timetable({ onNavigate }: TimetableProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Class Timetable</h1>
          <p className="text-gray-600">Weekly schedule and class timings</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="10-A">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-A">Class 10-A</SelectItem>
              <SelectItem value="10-B">Class 10-B</SelectItem>
              <SelectItem value="9-A">Class 9-A</SelectItem>
              <SelectItem value="9-B">Class 9-B</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-500" />
            Weekly Timetable - Class 10-A
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-200 bg-gray-50 p-3 text-left text-sm text-gray-700 min-w-[120px]">
                    Time / Day
                  </th>
                  {days.map((day) => (
                    <th key={day} className="border border-gray-200 bg-gray-50 p-3 text-center text-sm text-gray-700 min-w-[180px]">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot) => (
                  <tr key={slot}>
                    <td className="border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
                      {slot}
                    </td>
                    {days.map((day) => {
                      const period = timetableData[day][slot];
                      return (
                        <td key={`${day}-${slot}`} className="border border-gray-200 p-2">
                          {period ? (
                            <div className={`p-3 rounded-lg border ${getSubjectColor(period.subject)}`}>
                              <p className="text-sm mb-1">{period.subject}</p>
                              {period.teacher && (
                                <p className="text-xs opacity-80">{period.teacher}</p>
                              )}
                              {period.room && (
                                <p className="text-xs opacity-70 mt-1">{period.room}</p>
                              )}
                            </div>
                          ) : (
                            <div className="p-3 text-center text-gray-400 text-sm">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">Mathematics</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
          <span className="text-sm text-gray-600">Science</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-50 border border-purple-200 rounded"></div>
          <span className="text-sm text-gray-600">English</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-50 border border-yellow-200 rounded"></div>
          <span className="text-sm text-gray-600">History</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-50 border border-orange-200 rounded"></div>
          <span className="text-sm text-gray-600">Geography</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-50 border border-pink-200 rounded"></div>
          <span className="text-sm text-gray-600">Other</span>
        </div>
      </div>
    </div>
  );
}
