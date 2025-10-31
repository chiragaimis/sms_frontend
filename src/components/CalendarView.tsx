import React from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';

interface CalendarViewProps {
  onNavigate: (page: string) => void;
}

const events = [
  { id: '1', date: '2025-10-18', title: 'Parent-Teacher Meeting', type: 'meeting', time: '10:00 AM' },
  { id: '2', date: '2025-10-20', title: 'Mid-Term Exam - Mathematics', type: 'exam', time: '09:00 AM' },
  { id: '3', date: '2025-10-22', title: 'Mid-Term Exam - Science', type: 'exam', time: '10:00 AM' },
  { id: '4', date: '2025-10-25', title: 'Sports Day', type: 'event', time: '08:00 AM' },
  { id: '5', date: '2025-10-28', title: 'School Holiday', type: 'holiday', time: 'All Day' },
  { id: '6', date: '2025-11-01', title: 'Cultural Program', type: 'event', time: '02:00 PM' },
  { id: '7', date: '2025-11-15', title: 'Final Exam - History', type: 'exam', time: '02:00 PM' },
  { id: '8', date: '2025-11-18', title: 'Final Exam - Geography', type: 'exam', time: '09:00 AM' },
];

const upcomingEvents = events.slice(0, 5);

const getEventColor = (type: string) => {
  switch (type) {
    case 'exam':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'meeting':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'holiday':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'event':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export default function CalendarView({ onNavigate }: CalendarViewProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Academic Calendar</h1>
          <p className="text-gray-600">View exams, events, and holidays</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="border-gray-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-500" />
              October 2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-gray-200 p-4"
            />
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
                  </div>
                  <div className="flex-1 pb-4">
                    <Badge variant="outline" className={`${getEventColor(event.type)} mb-2`}>
                      {event.type}
                    </Badge>
                    <p className="text-sm text-gray-900 mb-1">{event.title}</p>
                    <p className="text-xs text-gray-500">{event.date}</p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* All Events List */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CalendarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 mb-1">{event.title}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                      <span className="text-xs text-gray-500">{event.date} • {event.time}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
          <span className="text-sm text-gray-600">Exams</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-100 border border-purple-200 rounded"></div>
          <span className="text-sm text-gray-600">Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
          <span className="text-sm text-gray-600">Holidays</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-100 border border-orange-200 rounded"></div>
          <span className="text-sm text-gray-600">Events</span>
        </div>
      </div>
    </div>
  );
}
