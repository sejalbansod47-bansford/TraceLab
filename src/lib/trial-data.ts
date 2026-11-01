import original from '@/assets/trial-A_original.jpg';
import object from '@/assets/trial-B_object.jpg';
import text from '@/assets/trial-C_text.jpg';
import can from '@/assets/trial-D_can.jpg';

export const TRIAL_PICTURES = [
  { name: 'A_original.jpg', url: original },
  { name: 'B_object.jpg', url: object },
  { name: 'C_text.jpg', url: text },
  { name: 'D_can.jpg', url: can },
] as const;

export async function loadTrialPictures(): Promise<File[]> {
  return Promise.all(TRIAL_PICTURES.map(async picture => {
    const response = await fetch(picture.url);
    if (!response.ok) throw new Error('Could not load the trial pictures. Please try again.');
    const blob = await response.blob();
    return new File([blob], picture.name, { type: blob.type || 'image/jpeg' });
  }));
}
