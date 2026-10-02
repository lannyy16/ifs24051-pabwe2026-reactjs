import { useState } from 'react';
import { FiBell, FiLogOut, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/states/authSlice';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent() {
  const [open, setOpen] = useState(false);
  const p = useSelector(s => s.users.profile);
  const d = useDispatch();
  const nav = useNavigate();

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-5 sticky top-0 z-20">
      <div>
        <p className="font-extrabold text-slate-800 text-lg">
          Delcom <span className="text-indigo-600">Lost &amp; Found</span>
        </p>
        <p className="text-xs text-slate-600 hidden sm:block">
          Platform laporan barang kampus
        </p>
      </div>

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifikasi"
          className="p-2 rounded-full hover:bg-slate-100"
        >
          <FiBell aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Menu pengguna"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <span className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center font-bold">
            {p?.name?.[0] || 'U'}
          </span>
          <span className="hidden md:block text-sm font-semibold">
            {p?.name || 'Pengguna'}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 top-12 bg-white border rounded-xl shadow-xl p-2 w-44">
            <button
              type="button"
              onClick={() => nav('/profile')}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              <FiUser className="inline mr-2" aria-hidden="true" />Profil
            </button>
            <button
              type="button"
              onClick={() => d(logout()).then(() => nav('/auth/login'))}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-red-700"
            >
              <FiLogOut className="inline mr-2" aria-hidden="true" />Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}