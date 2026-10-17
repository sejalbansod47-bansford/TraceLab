import original from '@/assets/trial-A_original.jpg.asset.json';
import object from '@/assets/trial-B_object.jpg.asset.json';
import text from '@/assets/trial-C_text.jpg.asset.json';
import can from '@/assets/trial-D_can.jpg.asset.json';

export const TRIAL_PICTURES = [
  { name: 'A_original.jpg', url: original.url },
  { name: 'B_object.jpg', url: object.url },
  { name: 'C_text.jpg', url: text.url },
  { name: 'D_can.jpg', url: can.url },
] as const;

export async function loadTrialPictures(): Promise<File[]> {
  return Promise.all(TRIAL_PICTURES.map(async picture => {
    const response = await fetch(picture.url);
    if (!response.ok) throw new Error('Could not load the trial pictures. Please try again.');
    const blob = await response.blob();
    return new File([blob], picture.name, { type: 'image/jpeg' });
  }));
}