import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface TeacherFormProps {
  onNavigate: (page: string) => void;
}

export default function TeacherForm({ onNavigate }: TeacherFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  // Fetch classes from backend
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/class/')
        .then(res => setClasses(res.data.results || res.data))
      .catch(err => toast.error('Failed to fetch classes'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/teacher/', {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        subject,
        qualification,
        experience: Number(experience),
        join_date: joinDate,
        assigned_classes_ids: selectedClasses
      });
      toast.success('Teacher added successfully!');
      setTimeout(() => onNavigate('teachers'), 1500);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add teacher');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('teachers')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-gray-900 mb-2">Add New Teacher</h1>
          <p className="text-gray-600">Fill in the teacher information below</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Info */}
        <Card className="border-gray-200">
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name *</Label>
                <Input value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Last Name *</Label>
                <Input value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Professional Info */}
        <Card className="border-gray-200">
          <CardHeader><CardTitle>Professional Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger><SelectValue placeholder="Select Subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Qualification *</Label>
                <Input value={qualification} onChange={e => setQualification(e.target.value)} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Experience (Years) *</Label>
                <Input type="number" value={experience} onChange={e => setExperience(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Joining Date *</Label>
                <Input type="date" value={joinDate} onChange={e => setJoinDate(e.target.value)} required />
              </div>
            </div>

            {/* Assign Classes */}
            <div className="space-y-2">
              <Label>Assign Classes *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {classes.map(cls => (
                  <div key={cls.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cls.id}
                      checked={selectedClasses.includes(cls.id)}
                    onCheckedChange={(checked: boolean | "indeterminate") => {
                      if (checked === true) setSelectedClasses([...selectedClasses, cls.id]);
                      else setSelectedClasses(selectedClasses.filter(c => c !== cls.id));
                    }}
                    />
                    <label htmlFor={cls.id} className="text-sm text-gray-700 cursor-pointer">{cls.name}</label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onNavigate('teachers')}>Cancel</Button>
          <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Save className="w-4 h-4 mr-2" /> Save Teacher
          </Button>
        </div>
      </form>
    </div>
  );
}
