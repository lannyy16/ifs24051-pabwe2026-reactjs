import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../states/authSlice'
import { showErrorDialog } from '../../../helpers/toolsHelper'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loading = useSelector((state) => state.auth.isAuthLogin)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      showErrorDialog(
        'Validasi',
        'Email dan password wajib diisi',
      )
      return
    }

    try {
      await dispatch(
        login({
          email,
          password,
        }),
      ).unwrap()

      navigate('/')
    } catch (error) {
      showErrorDialog(
        'Login gagal',
        error?.message || 'Periksa email dan password',
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-8"
    >
      <h2 className="text-2xl font-extrabold">
        Selamat datang 👋
      </h2>

      <p className="text-slate-500 mt-1">
        Masuk ke Delcom Lost &amp; Found
      </p>

      {/* EMAIL */}
      <label className="block mt-6 text-sm font-semibold">
        Email

        <input
          id="login-email-input"
          aria-label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full mt-2 p-3 border rounded-xl"
          placeholder="Masukkan email"
        />
      </label>

      {/* PASSWORD */}
      <label className="block mt-4 text-sm font-semibold">
        Password

        <input
          id="login-password-input"
          aria-label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full mt-2 p-3 border rounded-xl"
          placeholder="Masukkan password"
        />
      </label>

      {/* TOMBOL LOGIN */}
      <button
        id="login-submit-button"
        type="submit"
        disabled={loading}
        className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
      >
        {loading ? 'Memproses...' : 'Login'}
      </button>

      {/* REGISTER */}
      <p className="text-center text-sm mt-5">
        Belum punya akun?{' '}

        <Link
          className="text-indigo-600 font-bold"
          to="/auth/register"
        >
          Daftar
        </Link>
      </p>
    </form>
  )
}