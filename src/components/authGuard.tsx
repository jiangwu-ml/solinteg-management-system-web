import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

/** 未登录时跳转登录页 */
export function RequireAuth() {
  const token = useAuthStore(state => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

/** 已登录访问登录页时回到首页 */
export function RedirectIfAuthed() {
  const token = useAuthStore(state => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
