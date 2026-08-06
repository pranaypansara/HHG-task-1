// Backend base URL. Empty by default so the client uses relative paths that work
// in development (via Vite's proxy) and in production (same origin). Override with
// VITE_API_URL if the frontend and backend are hosted on different domains.
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const SHARE_CAPTION = 'Just built my HH Goa 2026 Builder Card 🚀\n\n#FrameInGoa #HHGoa2026';

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export async function generateCard({ file, name, builderTitle, role, status, college }) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('builderTitle', builderTitle);
  formData.append('role', role);
  formData.append('status', status);
  formData.append('college', college);

  const response = await fetch(`${API_BASE_URL}/api/cards/generate`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to generate your Builder Card');
  }

  return data;
}

export async function downloadCardImage(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error('Failed to download the Builder Card image');
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = 'HH-Goa-Builder-Card.png';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(objectUrl);
}

export function openShareOnX(shareUrl) {
  const text = `${SHARE_CAPTION}\n\n${shareUrl}`;
  const encoded = encodeURIComponent(text);
  const webIntent = `https://twitter.com/intent/tweet?text=${encoded}`;

  if (isMobileDevice()) {
    // Try the native X app first, fall back to the mobile website if it's not installed.
    const appUri = `twitter://post?message=${encoded}`;
    window.location.href = appUri;
    setTimeout(() => {
      window.location.href = webIntent;
    }, 1200);
  } else {
    window.open(webIntent, '_blank', 'noopener,width=550,height=420');
  }
}