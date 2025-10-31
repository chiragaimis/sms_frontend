import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Users, GraduationCap, Trash2 } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

interface ClassManagementProps {
  onNavigate: (page: string) => void;
}

export default function ClassManagement({ onNavigate }: ClassManagementProps) {
  const [classes, setClasses] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const fetchClasses = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/class/")
      .then((res) => setClasses(res.data.results))
      .catch(() => toast.error("Failed to fetch classes"));
  };

  useEffect(() => {
    fetchClasses();
    axios
      .get("http://127.0.0.1:8000/api/v1/teacher/")
      .then((res) => setTeachers(res.data.results))
      .catch(() => toast.error("Failed to fetch teachers"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/v1/class/", {
        grade: Number(grade),
        section,
        teacher_id: teacherId,
      });
      toast.success("Class created successfully!");
      setOpen(false);
      fetchClasses();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create class");
    }
  };

  const handleDelete = async () => {
    if (!selectedClassId) return;
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/class/${selectedClassId}/`
      );
      toast.success("Class deleted successfully!");
      setDeleteOpen(false);
      fetchClasses();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete class");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Class Management</h1>
          <p className="text-gray-600">
            Manage classes, sections, and class teachers
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" /> Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>Grade *</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {[8, 9, 10, 11, 12].map((g) => (
                      <SelectItem key={g} value={g.toString()}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Section *</Label>
                <Input
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="e.g., A, B, C"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Class Teacher *</Label>
                <Select value={teacherId} onValueChange={setTeacherId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        {t.first_name} {t.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Create Class
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>

          <div className="py-2 text-gray-600">
            Are you sure you want to delete this class? This action cannot be undone.
          </div>

          {/* 👇 Footer buttons explicitly visible */}
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              className="bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            className="border-gray-200 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  {cls.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Grade {cls.grade}
                </Badge>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => {
                  setSelectedClassId(cls.id);
                  setDeleteOpen(true);
                }}
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-4 h-4" />
                <div>
                  <p className="text-xs text-gray-500">Class Teacher</p>
                  <p className="text-sm font-medium">
                    {cls.teacher
                      ? `${cls.teacher.first_name} ${cls.teacher.last_name}`
                      : 'Not Assigned'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
