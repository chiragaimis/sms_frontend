import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Award, TrendingUp, FileText, DollarSign,Droplet } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentDetailProps {
  studentId: string;
  onNavigate: (page: string) => void;
}

interface StudentData {
  id: string;
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  photo?: string | null;
  student_class: string;
  section: string;
  roll_number: string;
  admission_date: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  parent_relation: string;
  emergency_contact: string;
  medical_info?: string | null;
  created_at: string;
}

export default function StudentDetail({ studentId, onNavigate }: StudentDetailProps) {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/getStudentById/${studentId}/`);
        setStudentData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudent();
  }, [studentId]);

  if (!studentData) return <p>Loading...</p>;

  // Dummy data for charts and tables (replace with real API data if available)
  const attendanceData = [
    { month: 'Jan', rate: 96 },
    { month: 'Feb', rate: 94 },
    { month: 'Mar', rate: 95 },
    { month: 'Apr', rate: 93 },
    { month: 'May', rate: 97 },
    { month: 'Jun', rate: 95 },
  ];

  const subjectMarks = [
    { subject: 'Mathematics', marks: 95, total: 100 },
    { subject: 'Science', marks: 92, total: 100 },
    { subject: 'English', marks: 88, total: 100 },
    { subject: 'History', marks: 90, total: 100 },
    { subject: 'Geography', marks: 87, total: 100 },
  ];

  const attendanceRecords = [
    { date: '2025-10-15', status: 'Present', remarks: '-' },
    { date: '2025-10-14', status: 'Present', remarks: '-' },
    { date: '2025-10-13', status: 'Absent', remarks: 'Sick Leave' },
    { date: '2025-10-12', status: 'Present', remarks: '-' },
    { date: '2025-10-11', status: 'Present', remarks: '-' },
  ];

  const feesHistory = [
    { date: '2025-09-01', amount: '$500', type: 'Tuition Fee', status: 'Paid', method: 'Card' },
    { date: '2025-08-01', amount: '$500', type: 'Tuition Fee', status: 'Paid', method: 'Card' },
    { date: '2025-07-01', amount: '$500', type: 'Tuition Fee', status: 'Paid', method: 'Bank Transfer' },
  ];

  const fullName = `${studentData.first_name} ${studentData.last_name}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('students')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900 mb-2">Student Profile</h1>
          <p className="text-gray-600">Complete information about the student</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Edit Profile
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="w-32 h-32">
                {studentData.photo ? <AvatarImage src={studentData.photo} /> :
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-3xl">
                    {studentData.first_name[0]}{studentData.last_name[0]}
                  </AvatarFallback>
                }
              </Avatar>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">{studentData.student_class}-{studentData.section}</Badge>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-gray-900 mb-4">{fullName}</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">Roll No: {studentData.roll_number}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{studentData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{studentData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">DOB: {studentData.date_of_birth}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Overall Attendance</p>
                  <div className="flex items-center gap-3">
                    <Progress value={95} className="flex-1" />
                    <span className="text-sm text-gray-900">95%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Performance</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Excellent</Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Fees Status</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200">Paid</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="fees">Fees</TabsTrigger>
          <TabsTrigger value="parent">Parent Info</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-600" />
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Gender</p>
                    <p className="text-sm text-gray-900">{studentData.gender}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                    <p className="text-sm text-gray-900">{studentData.blood_group || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Admission Date</p>
                    <p className="text-sm text-gray-900">{studentData.admission_date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 md:col-span-2 lg:col-span-3">
                  <MapPin className="w-4 h-4 text-green-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    <p className="text-sm text-gray-900">
                      {studentData.address}, {studentData.city}, {studentData.state} - {studentData.zip_code}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {attendanceRecords.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{record.remarks}</span>
                      <Badge className={record.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Payment History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {feesHistory.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">{fee.type}</p>
                      <p className="text-xs text-gray-500">{fee.date} • {fee.method}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-900">{fee.amount}</span>
                      <Badge className="bg-green-100 text-green-700">{fee.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Parent Info Tab */}
        <TabsContent value="parent">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Parent Name</p>
                    <p className="text-sm text-gray-900">{studentData.parent_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="text-sm text-gray-900">{studentData.parent_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                    <p className="text-sm text-gray-900">{studentData.parent_phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
