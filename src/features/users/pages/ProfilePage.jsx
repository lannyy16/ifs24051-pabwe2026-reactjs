import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeProfilePassword,
  changeProfilePhoto,
  fetchProfile,
  updateProfile,
} from '../states/userSlice';
import { showErrorDialog, showSuccessDialog } from '../../../helpers/toolsHelper';

export default function ProfilePage() {
  const d = useDispatch();
  const p = useSelector(s => s.users.profile);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  useEffect(() => {
    d(fetchProfile());
  }, [d]);

  useEffect(() => {
    if (p) {
      setName(p.name || '');
      setEmail(p.email || '');
    }
  }, [p]);

  if (!p) return <div className="card p-8">Memuat profil...</div>;

  const save = async () => {
    try {
      await d(updateProfile({ name, email })).unwrap();
      await showSuccessDialog('Berhasil', 'Profil diperbarui');
    } catch (x) {
      showErrorDialog('Gagal', x.message);
    }
  };

  const photo = async e => {
    const f = e.target.files?.[0];
    if (f) {
      try {
        await d(changeProfilePhoto(f)).unwrap();
        await d(fetchProfile());
        await showSuccessDialog('Berhasil', 'Foto profil diperbarui');
      } catch (x) {
        showErrorDialog('Gagal', x.message);
      }
    }
  };

  const pass = async () => {
    try {
      await d(changeProfilePassword(password)).unwrap();
      setPassword({
        password: '',
        new_password: '',
        new_password_confirmation: '',
      });
      await showSuccessDialog('Berhasil', 'Password diubah');
    } catch (x) {
      showErrorDialog('Gagal', x.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-extrabold">Profil Saya</h1>

      <div className="card p-6 mt-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 grid place-items-center text-3xl font-extrabold">
            {p.name?.[0]}
          </div>
          <div>
            <h2 className="font-extrabold text-xl">{p.name}</h2>
            <p className="text-slate-600">{p.email}</p>
          </div>
        </div>

        <label className="block mt-6 font-bold">
          Foto Profil
          <input
            type="file"
            accept="image/*"
            className="block mt-2"
            onChange={photo}
          />
        </label>

        <div className="grid md:grid-cols-2 gap-3 mt-6">
          <input
            aria-label="Nama"
            className="border p-3 rounded-xl"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            aria-label="Email"
            className="border p-3 rounded-xl"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={save}
          className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold"
        >
          Simpan Profil
        </button>
      </div>

      <div className="card p-6 mt-5">
        <h2 className="font-extrabold text-xl">Ganti Password</h2>
        {[
          ['password', 'Password Lama'],
          ['new_password', 'Password Baru'],
          ['new_password_confirmation', 'Konfirmasi Password'],
        ].map(([k, l]) => (
          <input
            key={k}
            aria-label={l}
            type="password"
            placeholder={l}
            className="w-full border p-3 rounded-xl mt-3"
            value={password[k]}
            onChange={e => setPassword({ ...password, [k]: e.target.value })}
          />
        ))}
        <button
          type="button"
          onClick={pass}
          className="mt-4 bg-slate-900 text-white px-5 py-3 rounded-xl font-bold"
        >
          Ubah Password
        </button>
      </div>
    </div>
  );
}