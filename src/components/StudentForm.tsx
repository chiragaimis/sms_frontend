import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Upload, Save, User, Calendar, Users, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import * as XLSX from "xlsx";

// 1️⃣ Function to download Excel template
const handleDownloadTemplate = () => {
  const headers = [
    "first_name",
    "last_name",
    "email",
    "phone",
    "date_of_birth",
    "gender",
    "blood_group",
    "address",
    "city",
    "state",
    "zip_code",
    "photo",
    "student_class",
    "section",
    "roll_number",
    "admission_date",
    "parent_name",
    "parent_email",
    "parent_phone",
    "parent_relation",
    "emergency_contact",
    "medical_info",
  ];

  const wb = (XLSX.utils as any).book_new();
  const ws = (XLSX.utils as any).json_to_sheet(
    [headers.reduce((acc, h) => ({ ...acc, [h]: "" }), {})]
  );
  (XLSX.utils as any).book_append_sheet(wb, ws, "Students_Template");
  (XLSX as any).writeFile(wb, "student_import_template.xlsx");
};

// 2️⃣ Function to handle uploaded Excel file
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (evt) => {
    const data = evt.target?.result;
    if (!data) return;

    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

    try {
      for (const student of jsonData) {
        await fetch("http://127.0.0.1:8000/api/v1/student/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        });
      }
      toast.success("✅ Students imported successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to import students. Please check your file.");
    }
  };
  reader.readAsBinaryString(file);
};

interface StudentFormProps {
  onNavigate: (page: string) => void;
}

export default function StudentForm({ onNavigate }: StudentFormProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    class: '',
    section: '',
    rollNumber: '',
    admissionDate: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    parentRelation: '',
    emergencyContact: '',
    medicalInfo: '',
    photo: '',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [classes, setClasses] = useState<any[]>([]);

  // ✅ Fetch classes from API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/class/")
      .then((res) => res.json())
      .then((data) => setClasses(data.results || []))
      .catch(() => console.error("Failed to fetch classes"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      date_of_birth: formData.dateOfBirth,
      gender: formData.gender,
      blood_group: formData.bloodGroup,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      photo: formData.photo,
      student_class: formData.class,
      section: formData.section,
      roll_number: formData.rollNumber,
      admission_date: formData.admissionDate,
      parent_name: formData.parentName,
      parent_email: formData.parentEmail,
      parent_phone: formData.parentPhone,
      parent_relation: formData.parentRelation,
      emergency_contact: formData.emergencyContact,
      medical_info: formData.medicalInfo,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/student/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to add student");

      const data = await response.json();
      console.log("Student created:", data);
      toast.success("Student added successfully!");
      setTimeout(() => onNavigate("students"), 1500);
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Failed to add student. Please try again.");
    }
  };


  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {step > 1 && (
          <Button variant="ghost" size="icon" onClick={() => setStep(step - 1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Student</h1>
          <p className="text-gray-500">
            {step === 1 && 'Fill in Personal Information'}
            {step === 2 && 'Fill in Academic Information'}
            {step === 3 && 'Fill in Parent/Guardian Information'}
          </p>
        </div>

        <div className="flex gap-4 mb-4">
          <Button variant="outline" onClick={handleDownloadTemplate}>
            Download Import Template
          </Button>

          <input
            type="file"
            accept=".xlsx, .xls"
            id="student-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("student-upload")?.click()}
          >
            Upload Filled Excel
          </Button>
          <input
            type="file"
            accept=".xlsx, .xls"
            id="student-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Photo Upload */}
        <div className="lg:col-span-1">
          <Card className="shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Student Photo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative w-44 h-44 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {formData.photo ? (
                    <>
                      <img
                        src={formData.photo}
                        alt="Student"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData({ ...formData, photo: '' });
                          if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-50 transition"
                      >
                        <X className="w-5 h-5 text-red-500" />
                      </button>
                    </>
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setFormData({ ...formData, photo: reader.result as string });
                      reader.readAsDataURL(file);
                    }
                  }}
                />

                <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> Upload Photo
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  Recommended: 400x400px, Max size: 2MB
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <Card className="shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <User className="w-5 h-5 text-blue-500" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <Select value={formData.gender} onValueChange={(value: string) => setFormData({ ...formData, gender: value })}>

                      <SelectTrigger id="gender"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {['male', 'female', 'other'].map(g => <SelectItem key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup">Blood Group</Label>
                    <Select value={formData.bloodGroup} onValueChange={(value: string) => setFormData({ ...formData, bloodGroup: value })}>
                      <SelectTrigger id="bloodGroup"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <SelectItem key={bg} value={bg}>{bg}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code *</Label>
                    <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" required />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button onClick={() => setStep(2)}>Next: Academic Info</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* ✅ Step 2: Academic Info (Fixed with API) */}
          {step === 2 && (
            <Card className="shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Calendar className="w-5 h-5 text-purple-500" /> Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class">Class *</Label>
                    <Select value={formData.class} onValueChange={(v: string) => setFormData({ ...formData, class: v })}>
                      <SelectTrigger id="class"><SelectValue placeholder="Select Class" /></SelectTrigger>
                      <SelectContent>
                        {/* Unique grade list bana rahe hain */}
                        {[...new Set(classes.map((cls: any) => cls.grade))].map((grade) => (
                          <SelectItem key={grade} value={grade}>
                            {grade}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="section">Section *</Label>
                    <Select value={formData.section} onValueChange={(v: string) => setFormData({ ...formData, section: v })}>
                      <SelectTrigger id="section"><SelectValue placeholder="Select Section" /></SelectTrigger>
                      <SelectContent>
                        {[...new Set(classes.map((c) => c.section))].map((sec) => (
                          <SelectItem key={sec} value={sec}>{sec}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNumber">Roll Number *</Label>
                    <Input id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admissionDate">Admission Date *</Label>
                    <Input id="admissionDate" name="admissionDate" type="date" value={formData.admissionDate} onChange={handleChange} />
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)}>Next: Parent Info</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Parent Info */}
          {step === 3 && (
            <Card className="shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <Users className="w-5 h-5 text-green-500" /> Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentRelation">Relation *</Label>
                    <Select value={formData.parentRelation} onValueChange={(v: string) => setFormData({ ...formData, parentRelation: v })}>
                      <SelectTrigger id="parentRelation"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {['father', 'mother', 'guardian'].map(r => <SelectItem key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">Parent Email *</Label>
                    <Input id="parentEmail" name="parentEmail" type="email" value={formData.parentEmail} onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Parent Phone *</Label>
                    <Input id="parentPhone" name="parentPhone" type="tel" value={formData.parentPhone} onChange={handleChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact *</Label>
                  <Input id="emergencyContact" name="emergencyContact" type="tel" value={formData.emergencyContact} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medicalInfo">Medical Information (Optional)</Label>
                  <Textarea id="medicalInfo" name="medicalInfo" value={formData.medicalInfo} onChange={handleChange} rows={3} placeholder="Allergies, medical conditions..." />
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Student
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
