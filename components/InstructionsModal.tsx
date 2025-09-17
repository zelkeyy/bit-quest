import React from 'react';
import { Button } from './Button';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full transform transition-all animate-fade-in-up text-slate-700">
        <h2 className="text-3xl font-bold text-center mb-4 text-violet-600">Petunjuk</h2>
        <div className="space-y-4">
          <p>Selamat datang di Quiz Challenger!</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Game ini terdiri dari 3 level: <span className="font-semibold text-emerald-600">Easy</span>, <span className="font-semibold text-amber-600">Medium</span>, dan <span className="font-semibold text-rose-600">Hard</span>.</li>
            <li>Anda harus menyelesaikan satu level untuk membuka level berikutnya.</li>
            <li>Jawablah semua pertanyaan dan capai skor minimal <span className="font-semibold text-violet-600">70%</span> untuk lanjut.</li>
            <li>Klik tombol [Pilih Level] untuk memilih level yang sudah terbuka.</li>
            <li>Progress Anda disimpan secara otomatis di browser ini.</li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <Button onClick={onClose}>Mengerti!</Button>
        </div>
      </div>
    </div>
  );
};