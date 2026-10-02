import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getAccessToken } from '../../../helpers/apiHelper'

export default function ProtectedRoute() {
  const location = useLocation()
  const token = getAccessToken()

  if (!token) {
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