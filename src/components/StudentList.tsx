import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface StudentListProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function StudentList({ onNavigate }: StudentListProps) {
  const [students, setStudents] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://127.0.0.1:8000/api/v1/student/");
      setStudents(res.data.results || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

   // Fetch classes from API
  const fetchClasses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/class/");
      setClasses(res.data.results || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
      toast.error("Failed to fetch class data");
    }
  };
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/student/${id}/`);
      toast.success("Student deleted successfully");
      fetchStudents();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete student");
    }
  };

  // Export filtered students to Excel
  const handleExport = () => {
    if (filteredStudents.length === 0) {
      toast.error("No students to export!");
      return;
    }

    const worksheetData = filteredStudents.map((s) => ({
      "First Name": s.first_name,
      "Last Name": s.last_name,
      Email: s.email,
      Phone: s.phone,
      "Date of Birth": s.date_of_birth,
      Gender: s.gender,
      "Blood Group": s.blood_group,
      Address: s.address,
      City: s.city,
      State: s.state,
      "ZIP Code": s.zip_code,
      Class: s.student_class,
      Section: s.section,
      "Roll Number": s.roll_number,
      "Admission Date": s.admission_date,
      "Parent Name": s.parent_name,
      "Parent Email": s.parent_email,
      "Parent Phone": s.parent_phone,
      "Parent Relation": s.parent_relation,
      "Emergency Contact": s.emergency_contact,
      "Medical Info": s.medical_info,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students_export.xlsx");

    toast.success("Excel file downloaded!");
  };

  // Filter students by search, class, and section
  const filteredStudents = students.filter((student) => {
    const searchMatch =
      student.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.roll_number?.toLowerCase().includes(searchQuery.toLowerCase());

    const classMatch = classFilter === "all" || student.student_class === classFilter;
    const sectionMatch = sectionFilter === "all" || student.section === sectionFilter;

    return searchMatch && classMatch && sectionMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2 font-semibold text-xl">
            Student Management
          </h1>
          <p className="text-gray-600">Manage all student records and information</p>
        </div>
        <Button
          onClick={() => onNavigate("student-form")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters (updated) */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, roll number, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Dynamic Class Filter */}
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {[...new Set(classes.map((cls: any) => cls.grade))].map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Class {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Dynamic Section Filter */}
            <Select value={sectionFilter} onValueChange={setSectionFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by Section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sections</SelectItem>
                {[...new Set(classes.map((cls: any) => cls.section))].map((section) => (
                  <SelectItem key={section} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Student Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Students ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Admission Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500">
                      Loading students...
                    </TableCell>
                  </TableRow>
                ) : filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-gray-500">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={student.photo || ""} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {student.first_name?.[0]?.toUpperCase()}
                              {student.last_name?.[0]?.toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {student.first_name} {student.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.student_id}</TableCell>
                      <TableCell>{student.student_class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.roll_number}</TableCell>
                      <TableCell>{student.parent_name}</TableCell>
                      <TableCell>{student.admission_date}</TableCell>

                      <TableCell className="text-right">
                        <DropdownMenu
                          open={activeMenu === student.id}
                          onOpenChange={(open: boolean) =>
                            setActiveMenu(open ? student.id : null)
                          }
                        >
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="bg-white shadow-lg border rounded-md">
                            <DropdownMenuItem
                              onClick={() =>
                                onNavigate("student-detail", {
                                  studentId: student.id,
                                })
                              }
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                onNavigate("student-form", {
                                  editId: student.id,
                                })
                              }
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => handleDelete(student.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
