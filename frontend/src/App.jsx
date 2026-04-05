import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout
import Layout from './components/Layout/Layout';

// Landing Page
import Landing from './pages/Landing/Landing';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboard
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import InstituteDashboard from './pages/Dashboard/InstituteDashboard';

// Curriculum Pages
import CurriculumList from './pages/Curriculum/CurriculumList';
import CreateCurriculum from './pages/Curriculum/CreateCurriculum';
import CurriculumDetail from './pages/Curriculum/CurriculumDetail';

// Submission Pages
import SubmissionList from './pages/Submissions/SubmissionList';
import MySubmissions from './pages/Submissions/MySubmissions';
import SubmissionDetail from './pages/Submissions/SubmissionDetail';
import InstituteList from './pages/Submissions/InstituteList';

// Assessment Pages
import AdminViewAssessments from './pages/assessments/AdminViewAssessments';
import InstituteAssessments from './pages/assessments/InstituteAssessments';
import CreateAssessment from './pages/assessments/CreateAssessment';
import EditAssessment from './pages/assessments/EditAssessment';
import AssessmentDetails from './pages/assessments/AssessmentDetails';

// Static Pages
import Documentation from './pages/Static/Documentation';
import Guidelines from './pages/Static/Guidelines';
import FAQs from './pages/Static/FAQs';
import Support from './pages/Static/Support';
import Contact from './pages/Static/Contact';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div className="app-loading"></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Layout>{children}</Layout>;
};

// Public Route Component (redirects if logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="app-loading"></div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Dashboard Router
const DashboardRouter = () => {
  const { isAdmin } = useAuth();
  return isAdmin() ? <AdminDashboard /> : <InstituteDashboard />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Landing Page - Home */}
      <Route path="/" element={<Landing />} />

      {/* Auth Routes */}
      <Route path="/login" element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      } />

      {/* Dashboard */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardRouter />
        </ProtectedRoute>
      } />

      {/* Curriculum Routes */}
      <Route path="/curriculums" element={
        <ProtectedRoute>
          <CurriculumList />
        </ProtectedRoute>
      } />
      <Route path="/curriculums/create" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <CreateCurriculum />
        </ProtectedRoute>
      } />
      <Route path="/curriculums/:id" element={
        <ProtectedRoute>
          <CurriculumDetail />
        </ProtectedRoute>
      } />

      {/* Admin Submission Routes */}
      <Route path="/submissions" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <SubmissionList />
        </ProtectedRoute>
      } />
      <Route path="/submissions/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <SubmissionDetail />
        </ProtectedRoute>
      } />
      <Route path="/institutes" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <InstituteList />
        </ProtectedRoute>
      } />

      {/* Institute Submission Routes */}
      <Route path="/my-submissions" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <MySubmissions />
        </ProtectedRoute>
      } />
      <Route path="/my-submissions/:id" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <SubmissionDetail />
        </ProtectedRoute>
      } />

      {/* Admin Assessment Routes */}
      <Route path="/admin/assessments" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminViewAssessments />
        </ProtectedRoute>
      } />
      <Route path="/admin/assessments/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AssessmentDetails />
        </ProtectedRoute>
      } />

      {/* Institute Assessment Routes */}
      <Route path="/institute/assessments" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <InstituteAssessments />
        </ProtectedRoute>
      } />
      <Route path="/institute/assessments/new" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <CreateAssessment />
        </ProtectedRoute>
      } />
      <Route path="/institute/assessments/edit/:id" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <EditAssessment />
        </ProtectedRoute>
      } />
      <Route path="/institute/assessments/:id" element={
        <ProtectedRoute allowedRoles={['institute']}>
          <AssessmentDetails />
        </ProtectedRoute>
      } />

      {/* Static Pages */}
      <Route path="/documentation" element={<Documentation />} />
      <Route path="/guidelines" element={<Guidelines />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
