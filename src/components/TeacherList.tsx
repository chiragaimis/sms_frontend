import React, { useState, useEffect } from "react";
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
import { Badge } from "./ui/badge";
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

interface TeacherListProps {
  onNavigate: (page: string, params?: any) => void;
}

interface Teacher {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  experience?: number;
  status?: string;
}

export default function TeacherList({ onNavigate }: TeacherListProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Fetch teachers from API
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/v1/teacher/");
      // API returns a single object or array?
      setTeachers(res.data.results);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Delete teacher
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/teacher/${id}/`);
      toast.success("Teacher deleted successfully!");
      setDeleteId(null);
      fetchTeachers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete teacher");
    }
  };

  // Filter teachers safely
  const filteredTeachers = teachers.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      (t.first_name ?? "").toLowerCase().includes(q) ||
      (t.last_name ?? "").toLowerCase().includes(q) ||
      (t.email ?? "").toLowerCase().includes(q) ||
      (t.subject ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Teacher Management</h1>
          <p className="text-gray-600">
            Manage all teaching staff and their information
          </p>
        </div>
        <Button
          onClick={() => onNavigate("teacher-form")}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Search & Export */}
      <Card className="border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, subject, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>All Teachers ({filteredTeachers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                            {(teacher.first_name?.[0] ?? "") +
                              (teacher.last_name?.[0] ?? "")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-gray-900">
                            {teacher.first_name} {teacher.last_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        {teacher.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {teacher.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {teacher.experience} yrs
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          teacher.status === "Active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-yellow-100 text-yellow-700 border-yellow-200"
                        }
                      >
                        {teacher.status ?? "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              onNavigate("teacher-detail", { teacherId: teacher.id })
                            }
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onNavigate("teacher-form", { teacherId: teacher.id })}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              {/* Use a normal button inside DropdownMenuItem */}
                              <button className="w-full text-left flex items-center gap-2 text-red-600 px-2 py-1">
                                <Trash2 className="w-4 h-4" />
                                Delete
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Teacher</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this teacher? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                  onClick={() => handleDelete(teacher.id)}
                                >
                                  Yes, Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
