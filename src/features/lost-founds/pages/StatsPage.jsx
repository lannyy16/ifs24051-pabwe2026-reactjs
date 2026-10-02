import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsDaily, fetchStatsMonthly } from '../states/lostFoundSlice';

export default function StatsPage() {
  const d = useDispatch();
  const s = useSelector(x => x.lostFounds.lostFoundStats);

  useEffect(() => {
    d(fetchStatsDaily());
    d(fetchStatsMonthly());
  }, [d]);

  const rows = Object.entries(s?.monthly?.stats_losts || {});

  return (
    <div>
      <h1 className="text-3xl font-extrabold">Statistik</h1>
      <p className="text-slate-600">Ringkasan laporan berdasarkan data API.</p>

      <div className="card p-6 mt-6">
        <h2 className="font-extrabold">Laporan Hilang per Bulan</h2>
        {rows.length ? (
          <div className="mt-4 space-y-3">
            {rows.map(([m, n]) => (
              <div key={m}>
                <div className="flex justify-between text-sm">
                  <span>{m}</span>
                  <b>{n}</b>
                </div>
                <div className="h-3 bg-slate-100 rounded-full mt-1">
                  <div
                    className="h-3 bg-indigo-600 rounded-full"
                    style={{ width: `${Math.min(100, Number(n) * 20 + 4)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-slate-600">Memuat statistik...</p>
        )}
      </div>
    </div>
  );
}