import React, { useEffect, useState } from "react";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface Subject {
  id: string;
  name: string;
  code: string;
  grade: string;
  type: string;
  teacher: string;
  teacher_name: string;
  created_at: string;
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
}

interface SubjectManagementProps {
  onNavigate: (page: string) => void;
}

export default function SubjectManagement({ onNavigate }: SubjectManagementProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [open, setOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [deleteSubject, setDeleteSubject] = useState<Subject | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    code: "",
    grade: "",
    type: "",
    teacher: "",
  });

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/subject/");
      const data = await res.json();
      setSubjects(data.results);
    } catch {
      toast.error("Failed to load subjects");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch teachers
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/teacher/")
      .then((res) => res.json())
      .then((data) => setTeachers(data.results))
      .catch(() => toast.error("Failed to load teachers"));
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingSubject
      ? `http://127.0.0.1:8000/api/v1/subject/${editingSubject.id}/`
      : "http://127.0.0.1:8000/api/v1/subject/";

    const method = editingSubject ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      toast.success(`Subject ${editingSubject ? "updated" : "created"} successfully!`);
      setOpen(false);
      setEditingSubject(null);
      setFormData({ name: "", code: "", grade: "", type: "", teacher: "" });
      fetchSubjects();
    } else {
      toast.error("Failed to save subject");
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      grade: subject.grade,
      type: subject.type,
      teacher: subject.teacher,
    });
    setOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteSubject) return;

    const response = await fetch(`http://127.0.0.1:8000/api/v1/subject/${deleteSubject.id}/`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Subject deleted successfully!");
      setDeleteSubject(null);
      fetchSubjects();
    } else {
      toast.error("Failed to delete subject");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Subject Management</h1>
          <p className="text-gray-600">Manage subjects, codes, and assigned teachers</p>
        </div>
        <Dialog open={open} onOpenChange={(v: boolean) => { setOpen(v); if (!v) setEditingSubject(null); }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              {editingSubject ? "Edit Subject" : "Add Subject"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Inputs */}
              <div className="space-y-2">
                <Label htmlFor="subjectName">Subject Name *</Label>
                <Input
                  id="subjectName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Mathematics"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Subject Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., MATH101"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade *</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  placeholder="e.g., 10 or 8-10"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Subject Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: string) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Core">Core</SelectItem>
                    <SelectItem value="Elective">Elective</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacher">Assign Teacher *</Label>
                <Select
                  value={formData.teacher}
                  onValueChange={(value: string) => setFormData({ ...formData, teacher: value })}
                >
                  <SelectTrigger id="teacher">
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.length > 0 ? (
                      teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.first_name} {t.last_name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="">No teachers available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {editingSubject ? "Update Subject" : "Create Subject"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Subjects Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Subjects ({subjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-gray-900">{subject.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{subject.code}</code>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-700">{subject.teacher_name}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      Class {subject.grade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={subject.type === "Core" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-green-50 text-green-700 border-green-200"}
                    >
                      {subject.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex gap-2 justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(subject)}>
                      <Edit className="w-4 h-4" />
                    </Button>

                    {/* Delete Modal */}
                    <Dialog open={deleteSubject?.id === subject.id} onOpenChange={() => setDeleteSubject(null)}>
                      <DialogTrigger asChild>
                        <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-600"
                  onClick={() => {
                    setDeleteSubject(subject);
                    setIsDeleteOpen(true); // open the dialog
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Confirm Delete</DialogTitle>
                        </DialogHeader>
                        <p>Are you sure you want to delete {subject.name}?</p>
                        <DialogFooter className="flex justify-end gap-2 mt-4">
                          <Button variant="outline" onClick={() => setDeleteSubject(null)}>Cancel</Button>
                          <Button className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>Delete</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
