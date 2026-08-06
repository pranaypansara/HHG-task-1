// Lightweight, reusable DOM toast. No framework dependency — works anywhere in
// the app and returns nothing so callers can fire-and-forget.
let toastTimer = null;

export function showToast(message, duration = 3200) {
  const existing = document.getElementById('hhg-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'hhg-toast';
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    left: '50%',
    bottom: '24px',
    transform: 'translateX(-50%)',
    zIndex: '9999',
    maxWidth: '90vw',
    padding: '12px 18px',
    borderRadius: '8px',
    background: 'rgba(3, 21, 13, 0.95)',
    border: '1px solid #fcd34d',
    color: '#fcd34d',
    fontFamily: "'Space Mono', monospace",
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    boxShadow: '0 12px 34px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    opacity: '0',
    transition: 'opacity 0.25s ease',
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}