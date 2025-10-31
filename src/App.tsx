import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import StudentDetail from './components/StudentDetail';
import TeacherList from './components/TeacherList';
import TeacherForm from './components/TeacherForm';
import TeacherDetail from './components/TeacherDetail';
import ClassManagement from './components/ClassManagement';
import SubjectManagement from './components/SubjectManagement';
import Attendance from './components/Attendance';
import AttendanceReports from './components/AttendanceReports';
import ExamSchedule from './components/ExamSchedule';
import MarksEntry from './components/MarksEntry';
import ResultsDashboard from './components/ResultsDashboard';
import FeesDashboard from './components/FeesDashboard';
import PaymentForm from './components/PaymentForm';
import TransactionHistory from './components/TransactionHistory';
import Timetable from './components/Timetable';
import CalendarView from './components/CalendarView';
import Settings from './components/Settings';
import MainLayout from './components/MainLayout';

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [user, setUser] = useState<User | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const navigateTo = (page: string, params?: any) => {
    if (params?.studentId) {
      setSelectedStudentId(params.studentId);
    }
    if (params?.teacherId) {
      setSelectedTeacherId(params.teacherId);
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'forgot-password':
        return <ForgotPassword onNavigate={navigateTo} />;
      case 'registration':
        return <Registration onNavigate={navigateTo} />;
      case 'dashboard':
        return <Dashboard user={user!} />;
      case 'students':
        return <StudentList onNavigate={navigateTo} />;
      case 'student-form':
        return <StudentForm onNavigate={navigateTo} />;
      case 'student-detail':
        return <StudentDetail studentId={selectedStudentId!} onNavigate={navigateTo} />;
      case 'teachers':
        return <TeacherList onNavigate={navigateTo} />;
      case 'teacher-form':
        return <TeacherForm onNavigate={navigateTo} />;
      case 'teacher-detail':
        return <TeacherDetail teacherId={selectedTeacherId!} onNavigate={navigateTo} />;
      case 'classes':
        return <ClassManagement onNavigate={navigateTo} />;
      case 'subjects':
        return <SubjectManagement onNavigate={navigateTo} />;
      case 'attendance':
        return <Attendance onNavigate={navigateTo} />;
      case 'attendance-reports':
        return <AttendanceReports onNavigate={navigateTo} />;
      case 'exam-schedule':
        return <ExamSchedule onNavigate={navigateTo} />;
      case 'marks-entry':
        return <MarksEntry onNavigate={navigateTo} />;
      case 'results':
        return <ResultsDashboard onNavigate={navigateTo} />;
      case 'fees':
        return <FeesDashboard onNavigate={navigateTo} />;
      case 'payment-form':
        return <PaymentForm onNavigate={navigateTo} />;
      case 'transactions':
        return <TransactionHistory onNavigate={navigateTo} />;
      case 'timetable':
        return <Timetable onNavigate={navigateTo} />;
      case 'calendar':
        return <CalendarView onNavigate={navigateTo} />;
      case 'settings':
        return <Settings onNavigate={navigateTo} />;
      default:
        return <Dashboard user={user!} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {renderPage()}
        <Toaster />
      </div>
    );
  }

  return (
    <MainLayout user={user} currentPage={currentPage} onNavigate={navigateTo} onLogout={handleLogout}>
      {renderPage()}
      <Toaster />
    </MainLayout>
  );
}

export default App;
