import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { getAccessToken } from './helpers/apiHelper'

import AuthLayout from './features/auth/layouts/AuthLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'

import LostFoundLayout from './features/lost-founds/layouts/LostFoundLayout'
import HomePage from './features/lost-founds/pages/HomePage'
import DetailPage from './features/lost-founds/pages/DetailPage'
import StatsPage from './features/lost-founds/pages/StatsPage'

import UsersPage from './features/users/pages/UsersPage'
import ProfilePage from './features/users/pages/ProfilePage'


function ProtectedRoute() {
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


export default function App() {
  return (
    <Routes>

      {/* =========================
          HALAMAN PUBLIC
      ========================== */}

      <Route path="/auth" element={<AuthLayout />}>
        <Route
          path="login"
          element={<LoginPage />}
        />

        <Route
          path="register"
          element={<RegisterPage />}
        />
      </Route>


      {/* =========================
          HALAMAN TERPROTEKSI
      ========================== */}

      <Route element={<ProtectedRoute />}>

        <Route
          path="/"
          element={<LostFoundLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />

          <Route
            path="lost-founds/:id"
            element={<DetailPage />}
          />

          <Route
            path="stats"
            element={<StatsPage />}
          />

          <Route
            path="users"
            element={<UsersPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />
        </Route>

      </Route>


      {/* =========================
          ROUTE TIDAK DITEMUKAN
      ========================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  )
}