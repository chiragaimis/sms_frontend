import React from 'react';
import { Users, GraduationCap, DollarSign, TrendingUp, BookOpen, Calendar, Bell, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { User } from '../App';

interface DashboardProps {
  user: User;
}

const statsCards = [
  {
    title: 'Total Students',
    value: '1,245',
    change: '+12%',
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    title: 'Total Teachers',
    value: '87',
    change: '+3%',
    trend: 'up',
    icon: GraduationCap,
    color: 'bg-purple-500',
  },
  {
    title: 'Revenue (This Month)',
    value: '$45,250',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-500',
  },
  {
    title: 'Attendance Rate',
    value: '94.5%',
    change: '+2.3%',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-orange-500',
  },
];

const attendanceData = [
  { month: 'Jan', rate: 92 },
  { month: 'Feb', rate: 89 },
  { month: 'Mar', rate: 94 },
  { month: 'Apr', rate: 91 },
  { month: 'May', rate: 95 },
  { month: 'Jun', rate: 93 },
  { month: 'Jul', rate: 94.5 },
];

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 38000 },
  { month: 'Mar', revenue: 44000 },
  { month: 'Apr', revenue: 40000 },
  { month: 'May', revenue: 47000 },
  { month: 'Jun', revenue: 43000 },
  { month: 'Jul', revenue: 45250 },
];

const performanceData = [
  { name: 'Excellent', value: 35, color: '#10b981' },
  { name: 'Good', value: 40, color: '#3b82f6' },
  { name: 'Average', value: 20, color: '#f59e0b' },
  { name: 'Poor', value: 5, color: '#ef4444' },
];

const upcomingExams = [
  { id: 1, subject: 'Mathematics', class: 'Class 10-A', date: '2025-10-20', time: '09:00 AM' },
  { id: 2, subject: 'Science', class: 'Class 9-B', date: '2025-10-22', time: '10:00 AM' },
  { id: 3, subject: 'English', class: 'Class 8-C', date: '2025-10-24', time: '11:00 AM' },
  { id: 4, subject: 'History', class: 'Class 11-A', date: '2025-10-25', time: '02:00 PM' },
];

const recentNotifications = [
  { id: 1, title: 'Parent-Teacher Meeting', message: 'Scheduled for October 18, 2025', time: '2 hours ago', type: 'info' },
  { id: 2, title: 'Fee Payment Reminder', message: '15 students have pending payments', time: '5 hours ago', type: 'warning' },
  { id: 3, title: 'New Student Admission', message: '3 new students enrolled today', time: '1 day ago', type: 'success' },
];

const topPerformers = [
  { id: 1, name: 'Emily Johnson', class: 'Class 10-A', score: 98.5, rank: 1 },
  { id: 2, name: 'Michael Chen', class: 'Class 10-B', score: 97.8, rank: 2 },
  { id: 3, name: 'Sarah Williams', class: 'Class 10-A', score: 96.9, rank: 3 },
  { id: 4, name: 'David Brown', class: 'Class 10-C', score: 96.2, rank: 4 },
];

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-gray-900 mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your school today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Monthly attendance rate over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue collection</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Distribution */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>Student Performance</CardTitle>
            <CardDescription>Overall grade distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Exams */}
        <Card className="border-gray-200 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Upcoming Exams
            </CardTitle>
            <CardDescription>Scheduled examinations this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{exam.subject}</p>
                      <p className="text-xs text-gray-500">{exam.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{exam.date}</p>
                    <p className="text-xs text-gray-500">{exam.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              Top Performers
            </CardTitle>
            <CardDescription>Students with highest scores this semester</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      student.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                      student.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      student.rank === 3 ? 'bg-orange-100 text-orange-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      #{student.rank}
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-900">{student.score}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-500" />
              Recent Notifications
            </CardTitle>
            <CardDescription>Latest updates and announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{notification.title}</p>
                    <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
