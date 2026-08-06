// Central API configuration.
//
// Set VITE_API_URL per environment:
//   client/.env.production  -> https://hhg-card-builder.onrender.com
//   client/.env.development -> the local backend URL (see that file)
//
// All network requests in this app go through the functions below so the
// backend URL is never hardcoded or repeated across components.
import { showToast } from './toast.js';

const API_URL = import.meta.env.VITE_API_URL;

export default API_URL;

export const SHARE_CAPTION = 'Just built my HH Goa 2026 Builder Card 🚀\n\n#FrameInGoa #HHGoa2026';

function api(path) {
  return `${API_URL}${path}`;
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// POST /api/cards/generate
export async function generateCard({ file, name, builderTitle, role, status, college }) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('builderTitle', builderTitle);
  formData.append('role', role);
  formData.append('status', status);
  formData.append('college', college);

  const response = await fetch(api('/api/cards/generate'), {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to generate your Builder Card');
  }

  return data;
}

// Downloads the generated PNG (imageUrl is returned by the backend).
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

// Opens a pre-filled X/Twitter tweet using the backend-generated shareUrl.
export function openShareOnX(shareUrl) {
  const text = `${SHARE_CAPTION}\n\n${shareUrl}`;
  const encoded = encodeURIComponent(text);
  const webIntent = `https://twitter.com/intent/tweet?text=${encoded}`;

  if (isMobileDevice()) {
    // Mobile: the X app may swallow the intent URL and open a blank composer, so
    // we pre-copy the full caption to the clipboard and tell the user to paste.
    return shareOnMobile(text, webIntent);
  }

  // Desktop: unchanged — open the tweet intent in a new window.
  window.open(webIntent, '_blank', 'noopener,width=550,height=420');
}

async function shareOnMobile(text, webIntent) {
  try {
    await copyToClipboard(text);
    showToast('Caption copied! If X opens with a blank post, simply paste.');
  } catch (error) {
    // Never block sharing because copying failed.
    if (import.meta.env.DEV) {
      console.error('Clipboard copy failed:', error);
    }
  }

  // Navigate directly so the native X app can handle the intent without a popup blocker.
  window.location.href = webIntent;
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  await legacyCopyFallback(text);
}

function legacyCopyFallback(text) {
  return new Promise((resolve, reject) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let succeeded = false;
    try {
      succeeded = document.execCommand('copy');
      textArea.remove();
      if (succeeded) resolve();
      else reject(new Error('execCommand("copy") was unsuccessful'));
    } catch (error) {
      textArea.remove();
      reject(error);
    }
  });
}