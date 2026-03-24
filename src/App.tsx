
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatbotProvider, useChatbot } from './contexts/ChatbotContext';
import { ViewModeProvider } from './contexts/ViewModeContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { GlobalChatbotSidebar } from './components/chatbot/GlobalChatbotSidebar';
import { MessageSquare, Sparkles } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { SparkLoader } from "@/components/ui/SparkLoader";
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useAuth } from '@/contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

// Pages
import Index from "./pages/Index";
import { AuthCallback } from './pages/auth/AuthCallback';

// Personal Mode Pages
import { PersonalHome } from './pages/personal/PersonalHome';
import { MySessions } from './pages/personal/MySessions';
import { PersonalMessages } from './pages/personal/PersonalMessages';
import { PersonalSubscription } from './pages/personal/PersonalSubscription';

// Institutional Mode Pages
import { InstitutionalDashboard } from './pages/institutional/InstitutionalDashboard';
import { InstitutionalUsers } from './pages/institutional/InstitutionalUsers';
import { InstitutionalExpertBooking } from './pages/institutional/InstitutionalExpertBooking';
import { InstitutionalCredits } from './pages/institutional/InstitutionalCredits';
import { InstitutionalEvents } from './pages/institutional/InstitutionalEvents';
import { InstitutionalReports } from './pages/institutional/InstitutionalReports';

// Expert (Senior Expert) Mode Pages
import { ExpertDashboard } from './pages/expert/ExpertDashboard';
import { ExpertBookingRequests } from './pages/expert/ExpertBookingRequests';
import { ExpertCampusVisits } from './pages/expert/ExpertCampusVisits';
import { ExpertEarnings } from './pages/expert/ExpertEarnings';
import { ExpertProfile } from './pages/expert/ExpertProfile';

import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherCourseManagement } from './components/courses/TeacherCourseManagement';
import { TeacherCoursesPage } from './pages/teacher/TeacherCoursesPage';
import { TeacherCodesPage } from './pages/teacher/TeacherCodesPage';
import { TeacherAnalyticsPage } from './pages/teacher/TeacherAnalyticsPage';
import { TeacherNotificationsPage } from './pages/teacher/TeacherNotificationsPage';
import DashboardSettingsPage from "./pages/DashboardSettingsPage";


import { MultiplayerQuizManagement } from './pages/teacher/MultiplayerQuizManagement';

// Teacher's Chapters 
import { TeacherChaptersPage } from './pages/teacher/TeacherChaptersPage';
import { TeacherChapterManagement } from './pages/teacher/TeacherChapterManagement';

// Teacher's Groups 
import { TeacherGroups } from './pages/teacher/TeacherGroups';

import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCoursesPage } from './pages/student/StudentCoursesPage';
import { StudentNotificationsPage } from './pages/student/StudentNotificationsPage';
import { StudentTransactions } from './pages/student/StudentTransactions';

import { Courses } from './pages/student/Courses';
import { CourseDetails } from './pages/teacher/CourseDetails';
import { CourseView } from './pages/student/CourseView';
import { CourseProgress } from './pages/student/CourseProgress';


import { StudentGroups } from './pages/student/StudentGroups';
import { StudentChaptersPage } from './pages/student/StudentChaptersPage';
import MultiplayerQuiz from './pages/student/MultiplayerQuiz';

// Shared Pages
import { GroupDetailPage } from './pages/groups/GroupDetailPage';
import { ChaptersPage } from './pages/chapters/ChaptersPage';
import { ChapterDetailPage } from './pages/chapters/ChapterDetailPage';

import RedeemPage from './pages/RedeemPage';

import { Unauthorized } from "./pages/Unauthorized";

import NotFound from "./pages/NotFound";

import Store from './pages/student/Store';
import Auth from "./pages/auth/Auth";
import { QuestionsPage } from "./pages/QuestionsPage";
import { TeachersPage } from './pages/teacher/TeachersPage';
import { TeacherProfile } from './pages/teacher/TeacherProfile';
import { TenantProvider, useTenant } from './contexts/TenantContext';
import { StudentStudents } from './pages/teacher/StudentStudents';
import { StudentDetail } from './pages/teacher/StudentDetail';
import TeacherSchedulePage from './pages/teacher/TeacherSchedulePage';
import { TeacherColorSettings } from './pages/teacher/TeacherColorSettings';
import { TeacherInvoicesPage } from './pages/teacher/TeacherInvoicesPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { ExpertsPage } from './pages/ExpertsPage';
import InvoiceDetailPage from "./pages/InvoiceDetailPage";


import SaasLanding from "./components/landing/SaasLanding";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminInvoicesPage } from "./pages/admin/AdminInvoicesPage";
import { AdminAnalyticsPage } from "./pages/admin/AdminAnalyticsPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdminSettingsPage } from "./pages/admin/AdminSettingsPage";
import { AboutPage } from "./pages/AboutPage";
import { MissionPage } from "./pages/MissionPage";
import { ContactPage } from "./pages/ContactPage";

const queryClient = new QueryClient();



const ChatSidebarToggle = () => {
  const { isOpen, openChatbot } = useChatbot();
  const { user } = useAuth() as { user: { role?: string } | null };
  
  if (isOpen) return null;
  
  // Determine user role and tooltip text
  const getUserRole = () => {
    if (!user) return 'guest';
    return user.role || 'student';
  };
  
  const userRole = getUserRole();
  
  const getTooltipText = () => {
    switch (userRole) {
      case 'teacher':
        return {
          title: 'AI Expert Assistant',
          description: 'Get help managing your sessions, bookings, and expert profile'
        };
      case 'student':
        return {
          title: 'AI Guidance Assistant',
          description: 'Find the right expert, explore domains, and get session recommendations'
        };
      default:
        return {
          title: 'AI Assistant',
          description: 'Discover verified experts and book your first guidance session'
        };
    }
  };
  
  const tooltipContent = getTooltipText();
  
  return (
    <TooltipProvider>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <button
            onClick={openChatbot}
            className="group fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 z-[10050] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="relative">
              {/* Main icon */}
              <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="h-1.5 w-1.5 text-white" />
              </div>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side="left" 
          className="p-3 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl shadow-black/10 rounded-lg max-w-[200px]"
        >
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
              <h4 className="font-semibold text-gray-900 text-xs">{tooltipContent.title}</h4>
            </div>
            <p className="text-xs text-gray-600 leading-tight">
              {tooltipContent.description}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  // Auto-scroll to top on route change
  useScrollToTop();
  // Hide Navbar on auth pages
  const hideNavbar = location.pathname.startsWith('/auth');
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {!hideNavbar && <Navbar extraXSpacing />}
      <main className="" >
        <Routes>
          <Route path="/" element={<Index/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/redeem" element={<ProtectedRoute><RedeemPage /></ProtectedRoute>} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Personal Mode Routes */}
          <Route path="/personal/home" element={<ProtectedRoute><PersonalHome /></ProtectedRoute>} />
          <Route path="/personal/sessions" element={<ProtectedRoute><MySessions /></ProtectedRoute>} />
          <Route path="/personal/messages" element={<ProtectedRoute><PersonalMessages /></ProtectedRoute>} />
          <Route path="/personal/subscription" element={<ProtectedRoute><PersonalSubscription /></ProtectedRoute>} />

          {/* Institutional Mode Routes */}
          <Route path="/institutional/dashboard" element={<ProtectedRoute><InstitutionalDashboard /></ProtectedRoute>} />
          <Route path="/institutional/users" element={<ProtectedRoute><InstitutionalUsers /></ProtectedRoute>} />
          <Route path="/institutional/expert-booking" element={<ProtectedRoute><InstitutionalExpertBooking /></ProtectedRoute>} />
          <Route path="/institutional/credits" element={<ProtectedRoute><InstitutionalCredits /></ProtectedRoute>} />
          <Route path="/institutional/events" element={<ProtectedRoute><InstitutionalEvents /></ProtectedRoute>} />
          <Route path="/institutional/reports" element={<ProtectedRoute><InstitutionalReports /></ProtectedRoute>} />

          {/* Expert (Senior Expert) Mode Routes */}
          <Route path="/expert/dashboard" element={<ProtectedRoute><ExpertDashboard /></ProtectedRoute>} />
          <Route path="/expert/bookings" element={<ProtectedRoute><ExpertBookingRequests /></ProtectedRoute>} />
          <Route path="/expert/campus-visits" element={<ProtectedRoute><ExpertCampusVisits /></ProtectedRoute>} />
          <Route path="/expert/earnings" element={<ProtectedRoute><ExpertEarnings /></ProtectedRoute>} />
          <Route path="/expert/profile" element={<ProtectedRoute><ExpertProfile /></ProtectedRoute>} />
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<ProtectedRoute><ExpertDashboard /></ProtectedRoute>} />
          <Route path="/teacher/courses" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCoursesPage /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id" element={<ProtectedRoute requiredRole={['teacher']}><CourseDetails /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/lessons" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/quizzes" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/attachments" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/live-lectures" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/lessons/:lessonId" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/quizzes/:quizId" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/courses/:id/manage/attachments/:attachmentId" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCourseManagement /></ProtectedRoute>} />
          <Route path="/teacher/groups" element={<ProtectedRoute requiredRole={['teacher']}><TeacherGroups /></ProtectedRoute>} />
          <Route path="/teacher/chapters" element={<ProtectedRoute requiredRole={['teacher']}><TeacherChaptersPage /></ProtectedRoute>} />
          <Route path="/teacher/chapters/:chapterId" element={<ProtectedRoute requiredRole={['teacher']}><TeacherChapterManagement /></ProtectedRoute>} />
          <Route path="/teacher/codes" element={<ProtectedRoute requiredRole={['teacher']}><TeacherCodesPage /></ProtectedRoute>} />
          <Route path="/teacher/analytics" element={<ProtectedRoute requiredRole={['teacher']}><TeacherAnalyticsPage /></ProtectedRoute>} />
          <Route path="/teacher/schedule" element={<ProtectedRoute requiredRole={['teacher']}><TeacherSchedulePage /></ProtectedRoute>} />
          <Route path="/teacher/notifications" element={<ProtectedRoute requiredRole={['teacher']}><TeacherNotificationsPage /></ProtectedRoute>} />
          <Route path="/teacher/colors" element={<ProtectedRoute requiredRole={['teacher']}><TeacherColorSettings /></ProtectedRoute>} />
          <Route path="/teacher/invoices" element={<ProtectedRoute requiredRole={['teacher']}><TeacherInvoicesPage /></ProtectedRoute>} />
          <Route path="/teacher/students" element={<ProtectedRoute requiredRole={['teacher']}><StudentStudents /></ProtectedRoute>} />
          <Route path="/teacher/students/:studentId" element={<ProtectedRoute requiredRole={['teacher']}><StudentDetail /></ProtectedRoute>} />
          <Route path="/teacher/multiplayer-quiz" element={<ProtectedRoute requiredRole={['teacher']}><MultiplayerQuizManagement /></ProtectedRoute>} />
          <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettingsPage /></ProtectedRoute>} />
          {/* Student Routes - accessible to all authenticated users */}
          <Route path="/student/dashboard" element={<ProtectedRoute><PersonalHome /></ProtectedRoute>} />
          <Route path="/student/courses" element={<ProtectedRoute><StudentCoursesPage /></ProtectedRoute>} />
          <Route path="/student/chapters" element={<ProtectedRoute><StudentChaptersPage /></ProtectedRoute>} />
          <Route path="/student/groups" element={<ProtectedRoute><StudentGroups /></ProtectedRoute>} />
          <Route path="/student/transactions" element={<ProtectedRoute><StudentTransactions /></ProtectedRoute>} />
          <Route path="/multiplayer-quiz" element={<ProtectedRoute><MultiplayerQuiz /></ProtectedRoute>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseView />} />
          <Route path="/courses/:id/progress" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
          <Route path="/courses/:id/progress/lesson/:lessonId" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
          <Route path="/courses/:id/progress/attachment/:attachmentId" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
          <Route path="/courses/:id/progress/quiz/:quizId" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
          <Route path="/courses/:id/progress/quiz/:quizId/attempt/:attemptId" element={<ProtectedRoute><CourseProgress /></ProtectedRoute>} />
          <Route path="/chapters" element={<ChaptersPage />} />
          <Route path="/chapters/:id" element={<ChapterDetailPage />} />
          <Route path="/student/notifications" element={<ProtectedRoute><StudentNotificationsPage /></ProtectedRoute>} />
          <Route path="/student/store" element={<ProtectedRoute><Store /></ProtectedRoute>} />
          {/* Admin Routes  */}
          <Route path="/admin/dashboard" element={<ProtectedRoute requiredRole={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/invoices" element={<ProtectedRoute requiredRole={['admin']}><AdminInvoicesPage /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute requiredRole={['admin']}><AdminAnalyticsPage /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute requiredRole={['admin']}><AdminUsersPage /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute requiredRole={['admin']}><AdminSettingsPage /></ProtectedRoute>} />
          {/* Shared Routes */}
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teachers/:teacherSlug" element={<TeacherProfile />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Invoice Detail Route */}
          <Route path="/invoices/:invoiceId" element={<InvoiceDetailPage />} />

          <Route path="/questions" element={<ProtectedRoute><QuestionsPage /></ProtectedRoute>} />
          <Route path="/groups/:id" element={<ProtectedRoute><GroupDetailPage /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <GlobalChatbotSidebar />
      <ChatSidebarToggle />
    </div>
  );
};

const AppRoutesWithTenant = () => {
  const { slug, teacher, loading } = useTenant();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <SparkLoader text="Wisora" color="white" size={56} />
      </div>
    );
  }

  // If subdomain is 'platform' or 'www', render main platform as usual
  if (!slug || slug === 'platform' || slug === 'www') {
    return <AppRoutes />;
  }

  // If subdomain is a teacher's slug and teacher exists, render the same routes (for now)
  if (teacher) {
    return <AppRoutes />;
  }

  // If subdomain is not found, show fallback (optional)
  return <AppRoutes />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <AuthProvider>
            <ViewModeProvider>
            <ChatbotProvider>
              <LanguageProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <TenantProvider>
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center bg-black">
                        <SparkLoader text="Wisora" color="white" size={56} />
                      </div>
                    }>
                      <BrowserRouter>
                        <AppRoutesWithTenant />
                      </BrowserRouter>
                    </Suspense>
                  </TenantProvider>
                </TooltipProvider>
              </LanguageProvider>
            </ChatbotProvider>
            </ViewModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);

export default App;
