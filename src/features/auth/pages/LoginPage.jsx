import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../states/authSlice';
import { showErrorDialog } from '../../../helpers/toolsHelper';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const nav = useNavigate();
  const loading = useSelector(s => s.auth.isAuthLogin);

  const submit = async e => {
    e.preventDefault();
    if (!email || !password)
      return showErrorDialog('Validasi', 'Email dan password wajib diisi');
    try {
      await dispatch(login({ email, password })).unwrap();
      nav('/');
    } catch (err) {
      showErrorDialog('Login gagal', err?.message || 'Periksa akun');
    }
  };

  return (
    <form onSubmit={submit} className="card p-8">
      <h1 className="text-2xl font-extrabold">Selamat datang 👋</h1>
      <p className="text-slate-600 mt-1">Masuk ke Delcom Lost &amp; Found</p>

      <label className="block mt-6 text-sm font-semibold">
        Email
        <input
          id="login-email-input"
          aria-label="Email"
          className="w-full mt-2 p-3 border rounded-xl"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label className="block mt-4 text-sm font-semibold">
        Password
        <input
          id="login-password-input"
          aria-label="Password"
          className="w-full mt-2 p-3 border rounded-xl"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button
        id="login-submit-button"
        type="submit"
        disabled={loading}
        className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-bold"
      >
        {loading ? 'Memproses...' : 'Login'}
      </button>

      <p className="text-center text-sm mt-5">
        Belum punya akun?{' '}
        <Link className="text-indigo-600 font-bold" to="/auth/register">
          Daftar
        </Link>
      </p>
    </form>
  );
}