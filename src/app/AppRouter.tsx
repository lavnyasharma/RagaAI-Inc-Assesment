import { lazy, Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';
import { LoginPage } from '../features/auth/components/LoginPage';

// Lazy-loaded route components for code splitting
const DashboardPage = lazy(() =>
  import('../features/dashboard/DashboardPage').then((m) => ({
    default: m.DashboardPage,
  }))
);
const AnalyticsPage = lazy(() =>
  import('../features/analytics/AnalyticsPage').then((m) => ({
    default: m.AnalyticsPage,
  }))
);
const PatientsPage = lazy(() =>
  import('../features/patients/PatientsPage').then((m) => ({
    default: m.PatientsPage,
  }))
);

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[var(--color-dark-500)] border-t-[var(--color-accent-cyan)] rounded-full animate-spin" />
        <p className="text-sm text-[var(--color-dark-300)]">Loading...</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
          </Route>

          {/* Redirects */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
