import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLostFound, fetchLostFound } from '../states/lostFoundSlice';
import ChangeModal from '../modals/ChangeModal';
import ChangeCoverModal from '../modals/ChangeCoverModal';
import {
  formatDate,
  showConfirmDialog,
  showSuccessDialog,
} from '../../../helpers/toolsHelper';

export default function DetailPage() {
  const { id } = useParams();
  const d = useDispatch();
  const nav = useNavigate();
  const item = useSelector(s => s.lostFounds.lostFound);
  const [edit, setEdit] = useState(false);
  const [cover, setCover] = useState(false);

  useEffect(() => {
    d(fetchLostFound(id));
  }, [d, id]);

  if (!item) return <div className="card p-10">Memuat detail...</div>;

  const remove = async () => {
    if (
      await showConfirmDialog('Hapus laporan', 'Data ini akan dihapus permanen.')
    ) {
      await d(deleteLostFound(Number(id))).unwrap();
      await showSuccessDialog('Berhasil', 'Laporan dihapus');
      nav('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="text-indigo-600 font-bold">
        ← Kembali
      </Link>
      <div className="card overflow-hidden mt-4">
        <div className="h-72 bg-slate-100">
          {item.cover ? (
            <img
              className="w-full h-full object-cover"
              src={
                item.cover.startsWith('http')
                  ? item.cover
                  : `https://open-api.delcom.org/${item.cover}`
              }
              alt={item.title || 'Cover laporan'}
              loading="eager"
            />
          ) : (
            <div className="h-full grid place-items-center text-slate-500">
              Tidak ada cover
            </div>
          )}
        </div>
        <div className="p-7">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <span
                className={`text-xs px-3 py-1 rounded-full font-bold ${
                  item.status === 'lost'
                    ? 'bg-rose-50 text-rose-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {item.status === 'lost' ? 'Barang Hilang' : 'Barang Ditemukan'}
              </span>
              <h1 className="text-3xl font-extrabold mt-3">{item.title}</h1>
            </div>
            {item.is_completed ? (
              <span className="h-fit bg-green-100 text-green-800 px-3 py-2 rounded-full font-bold">
                Selesai
              </span>
            ) : (
              <span className="h-fit bg-amber-100 text-amber-800 px-3 py-2 rounded-full font-bold">
                Diproses
              </span>
            )}
          </div>
          <p className="text-slate-600 leading-7 mt-5 whitespace-pre-wrap">
            {item.description}
          </p>
          <div className="mt-6 p-4 bg-slate-50 rounded-xl">
            <p className="font-bold">Pelapor</p>
            <p className="text-slate-600">{item.author?.name || '-'}</p>
            <p className="text-sm text-slate-600">
              Dilaporkan {formatDate(item.created_at)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-6">
            <button
              type="button"
              onClick={() => setCover(true)}
              className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
            >
              Ganti Cover
            </button>
            <button
              type="button"
              onClick={() => setEdit(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={remove}
              className="px-4 py-2 rounded-xl bg-rose-700 text-white font-bold"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      {edit && (
        <ChangeModal
          item={item}
          onClose={() => {
            setEdit(false);
            d(fetchLostFound(id));
          }}
        />
      )}
      {cover && (
        <ChangeCoverModal
          id={Number(id)}
          onClose={() => {
            setCover(false);
            d(fetchLostFound(id));
          }}
        />
      )}
    </div>
  );
}