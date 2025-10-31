import React, { useState } from 'react';
import { Save, Upload, Shield, Bell, School } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

export default function Settings({ onNavigate }: SettingsProps) {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your school and system settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <School className="w-5 h-5 text-blue-500" />
                School Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-6">
                <div className="space-y-2">
                  <Label>School Logo</Label>
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <School className="w-12 h-12 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="schoolName">School Name *</Label>
                      <Input id="schoolName" defaultValue="Greenwood High School" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schoolCode">School Code</Label>
                      <Input id="schoolCode" defaultValue="GHS2025" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="info@greenwood.edu" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" defaultValue="+1234567890" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" defaultValue="123 Education Street, Springfield, IL 62701" rows={2} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (ET)</SelectItem>
                      <SelectItem value="cst">Central Time (CT)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="dateFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Academic Year</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Select defaultValue="2025">
                    <SelectTrigger id="academicYear">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024-2025</SelectItem>
                      <SelectItem value="2025">2025-2026</SelectItem>
                      <SelectItem value="2026">2026-2027</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" defaultValue="2025-08-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" defaultValue="2026-06-30" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Grading System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                  <div>Grade</div>
                  <div>Min Score</div>
                  <div>Max Score</div>
                </div>
                {[
                  { grade: 'A+', min: 90, max: 100 },
                  { grade: 'A', min: 80, max: 89 },
                  { grade: 'B', min: 70, max: 79 },
                  { grade: 'C', min: 60, max: 69 },
                  { grade: 'D', min: 50, max: 59 },
                  { grade: 'F', min: 0, max: 49 },
                ].map((item) => (
                  <div key={item.grade} className="grid grid-cols-3 gap-4">
                    <Input value={item.grade} readOnly className="bg-gray-50" />
                    <Input type="number" defaultValue={item.min} />
                    <Input type="number" defaultValue={item.max} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Attendance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minAttendance">Minimum Attendance Required (%)</Label>
                <Input id="minAttendance" type="number" defaultValue="75" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">Send low attendance alerts</p>
                  <p className="text-xs text-gray-500">Notify parents when attendance drops below minimum</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-500" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-900">Push Notifications</p>
                  <p className="text-xs text-gray-500">Receive push notifications on your device</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle>Notification Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 'attendance', label: 'Attendance Alerts', description: 'Low attendance notifications' },
                { id: 'fees', label: 'Fee Reminders', description: 'Payment due reminders' },
                { id: 'exams', label: 'Exam Announcements', description: 'Exam schedules and results' },
                { id: 'events', label: 'Event Notifications', description: 'School events and activities' },
                { id: 'announcements', label: 'General Announcements', description: 'Important school updates' },
              ].map((item) => (
                <div key={item.id} className="flex items-start space-x-3">
                  <Checkbox id={item.id} defaultChecked />
                  <div className="flex-1">
                    <label htmlFor={item.id} className="text-sm text-gray-900 cursor-pointer">
                      {item.label}
                    </label>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                User Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { role: 'Admin', users: 3, permissions: 'Full Access' },
                  { role: 'Teacher', users: 87, permissions: 'Limited Access' },
                  { role: 'Student', users: 1245, permissions: 'View Only' },
                  { role: 'Parent', users: 2100, permissions: 'View Student Data' },
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-900">{item.role}</p>
                      <p className="text-xs text-gray-500">{item.users} users • {item.permissions}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
