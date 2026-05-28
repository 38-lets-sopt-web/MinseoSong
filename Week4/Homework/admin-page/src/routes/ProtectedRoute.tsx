import { Navigate, Outlet } from 'react-router-dom';
import { authStorage } from '@/utils/authStorage';

function ProtectedRoute() {
  return authStorage.getUserId() ? <Outlet /> : <Navigate replace to="/" />;
}

export default ProtectedRoute;
