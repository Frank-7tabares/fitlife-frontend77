import { Navigate, RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy loading de componentes
const Login = lazy(() => import('@features/auth/components/Login'));
const Register = lazy(() => import('@features/auth/components/Register'));
const Dashboard = lazy(() => import('@features/dashboard/components/DashboardHome'));
const Assessment = lazy(() => import('@features/assessment/components/AssessmentForm'));

// Loading component
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Cargando...
  </div>
);

// Wrapper para lazy loading
const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: (
          <LazyLoad>
            <Login />
          </LazyLoad>
        ),
      },
      {
        path: 'register',
        element: (
          <LazyLoad>
            <Register />
          </LazyLoad>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <LazyLoad>
        <Dashboard />
      </LazyLoad>
    ),
  },
  {
    path: '/assessment',
    element: (
      <LazyLoad>
        <Assessment />
      </LazyLoad>
    ),
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]