import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Mail, Phone, Award, BookOpen, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

interface TeacherDetailProps {
  teacherId: string;
  onNavigate: (page: string) => void;
}

interface ClassAssigned {
  id: string;
  name: string;
  grade: string;
  section: string;
}

interface TeacherData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  qualification: string;
  experience: number;
  join_date: string;
  classes_assigned?: ClassAssigned[]; // optional now
}

export default function TeacherDetail({ teacherId, onNavigate }: TeacherDetailProps) {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v1/getTeacherById/${teacherId}/`);
        setTeacherData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTeacher();
  }, [teacherId]);

  if (!teacherData) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('teachers')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-gray-900 mb-2">Teacher Profile</h1>
          <p className="text-gray-600">Complete information about the teacher</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Edit Profile
        </Button>
      </div>

      {/* Teacher Info */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white text-3xl">
                  {teacherData.first_name?.[0]}{teacherData.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-gray-900 mb-4">{teacherData.first_name} {teacherData.last_name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{teacherData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{teacherData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-sm">{teacherData.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{teacherData.experience} years</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined: {teacherData.join_date}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Qualification</p>
                <p className="text-sm text-gray-900">{teacherData.qualification}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Classes Assigned</p>
                <div className="flex flex-wrap gap-2">
                  {teacherData.classes_assigned && teacherData.classes_assigned.length > 0 ? (
                    teacherData.classes_assigned.map((cls) => (
                      <Badge
                        key={cls.id}
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {cls.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No classes assigned to this teacher.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
