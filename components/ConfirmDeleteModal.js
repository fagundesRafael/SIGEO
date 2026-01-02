// components/ConfirmDeleteModal.js
"use client";

export default function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="mb-4 text-black">{message}</p>
        <div className="flex justify-end gap-4">
          <img className="w-10 h-10 animate-glow" src="/sigeo_full-padlock.png" alt="padlock" />
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
