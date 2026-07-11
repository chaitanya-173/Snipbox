export default function ConfirmDialog({ open, title, description, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        className="relative w-full max-w-sm rounded-2xl border border-[var(--border)]
                   bg-[var(--surface)] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.5)]"
      >
        <h3 className="text-[17px] font-semibold text-[var(--text)]">{title}</h3>
        <p className="text-[13.5px] text-[var(--text-muted)] mt-2 leading-relaxed">
          {description}
        </p>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-[13.5px] font-medium text-[var(--text)]
                       bg-[var(--surface-2)] hover:opacity-80 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-[13.5px] font-medium text-white
                       bg-[var(--danger)] hover:opacity-90 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}