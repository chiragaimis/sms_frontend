import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar, 
  ClipboardCheck, FileText, DollarSign, Clock, Settings, 
  Bell, Search, LogOut, Menu, X, ChevronDown 
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import type { User } from '../App';

interface MainLayoutProps {
  user: User;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  subItems?: { id: string; label: string }[];
}

export default function MainLayout({ user, currentPage, onNavigate, onLogout, children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['students', 'teachers', 'attendance', 'exams', 'fees']);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      id: 'students',
      label: 'Students',
      icon: <Users className="w-5 h-5" />,
      subItems: [
        { id: 'students', label: 'All Students' },
        { id: 'student-form', label: 'Add Student' },
      ],
    },
    {
      id: 'teachers',
      label: 'Teachers',
      icon: <GraduationCap className="w-5 h-5" />,
      subItems: [
        { id: 'teachers', label: 'All Teachers' },
        { id: 'teacher-form', label: 'Add Teacher' },
      ],
    },
    {
      id: 'academic',
      label: 'Academic',
      icon: <BookOpen className="w-5 h-5" />,
      subItems: [
        { id: 'classes', label: 'Classes' },
        { id: 'subjects', label: 'Subjects' },
      ],
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <ClipboardCheck className="w-5 h-5" />,
      subItems: [
        { id: 'attendance', label: 'Mark Attendance' },
        { id: 'attendance-reports', label: 'Reports' },
      ],
    },
    {
      id: 'exams',
      label: 'Exams & Results',
      icon: <FileText className="w-5 h-5" />,
      subItems: [
        { id: 'exam-schedule', label: 'Exam Schedule' },
        { id: 'marks-entry', label: 'Enter Marks' },
        { id: 'results', label: 'Results' },
      ],
    },
    {
      id: 'fees',
      label: 'Fees & Payments',
      icon: <DollarSign className="w-5 h-5" />,
      subItems: [
        { id: 'fees', label: 'Fees Dashboard' },
        { id: 'payment-form', label: 'Add Payment' },
        { id: 'transactions', label: 'Transactions' },
      ],
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: <Clock className="w-5 h-5" />,
      subItems: [
        { id: 'timetable', label: 'Timetable' },
        { id: 'calendar', label: 'Calendar' },
      ],
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActive = (itemId: string) => currentPage === itemId;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-gray-900">EduManage</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => {
                  if (item.subItems) {
                    toggleMenu(item.id);
                  } else {
                    onNavigate(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.id)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {sidebarOpen && <span className="text-sm">{item.label}</span>}
                </div>
                {sidebarOpen && item.subItems && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMenus.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Sub-menu */}
              {sidebarOpen && item.subItems && expandedMenus.includes(item.id) && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(subItem.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive(subItem.id)
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search students, teachers, classes..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <div className="text-sm text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
