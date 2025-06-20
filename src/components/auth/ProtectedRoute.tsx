
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, profile, isLoading, isAdmin } = useAuth();

  console.log('ProtectedRoute check:', { user: user?.email, profile: profile?.role, isLoading, isAdmin, requireAdmin });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to auth');
    return <Navigate to="/auth" />;
  }

  if (requireAdmin && !isAdmin) {
    console.log('Admin required but user is not admin, redirecting to home');
    return <Navigate to="/" />;
  }

  console.log('Access granted to protected route');
  return <>{children}</>;
};

export default ProtectedRoute;
