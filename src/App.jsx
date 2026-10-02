import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

// Halaman auth — import LANGSUNG (bukan lazy) agar form langsung render
import AuthLayout from './features/auth/layouts/AuthLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'

// Halaman utama — tetap lazy
const LostFoundLayout = lazy(() => import('./features/lost-founds/layouts/LostFoundLayout'))
const HomePage = lazy(() => import('./features/lost-founds/pages/HomePage'))
const DetailPage = lazy(() => import('./features/lost-founds/pages/DetailPage'))
const StatsPage = lazy(() => import('./features/lost-founds/pages/StatsPage'))
const UsersPage = lazy(() => import('./features/users/pages/UsersPage'))
const ProfilePage = lazy(() => import('./features/users/pages/ProfilePage'))

function LoadingPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <p className="text-slate-500 font-semibold">Memuat halaman...</p>
    </main>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="/" element={<LostFoundLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lost-founds/:id" element={<DetailPage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}