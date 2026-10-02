import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function ProtectedRoute() {
  const location = useLocation()

  const token = useSelector((state) => state.auth?.token)
  const isAuthenticated = Boolean(token)

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return <Outlet />
}