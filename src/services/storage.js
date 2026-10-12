/* ==========================================================================
   R&G COLLECTIONS - IMAGE OPTIMIZATION & STORAGE SERVICE
   Compresses oversized camera photos client-side to ensure fast loading
   ========================================================================== */

import { storage, ref, uploadString, getDownloadURL } from './firebase.js';

export function compressImageFile(file, maxDimension = 1200, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export async function uploadProductImage(dataUrl, path = 'products') {
  if (!dataUrl) return '';

  // If Firebase Storage is available and configured, upload string
  if (storage) {
    try {
      const filename = `${path}/rg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}.jpg`;
      const storageRef = ref(storage, filename);
      await uploadString(storageRef, dataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (e) {
      console.warn('Firebase Storage upload fallback to Data URL:', e.message);
    }
  }

  // Resilient fallback returns optimized compressed Data URL
  return dataUrl;
}
