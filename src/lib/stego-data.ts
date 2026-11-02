import clean from '@/assets/stego-A_clean.jpg';
import hidden from '@/assets/stego-B_hidden.zip.jpg';

/** Synthetic pair: same pixels on screen; B has a ZIP appended after JPEG EOI. */
export const STEGO_PICTURES = [
  { name: 'A_clean.jpg', url: clean },
  { name: 'B_hidden.zip.jpg', url: hidden },
] as const;

export async function loadStegoPictures(): Promise<File[]> {
  return Promise.all(STEGO_PICTURES.map(async picture => {
    const response = await fetch(picture.url);
    if (!response.ok) throw new Error('Could not load the stego demo pictures. Please try again.');
    const blob = await response.blob();
    return new File([blob], picture.name, { type: blob.type || 'image/jpeg' });
  }));
}
