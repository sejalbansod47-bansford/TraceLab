import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadTrialPictures, TRIAL_PICTURES } from '@/lib/trial-data';
import { createCase } from '@/lib/tracelab-api';

afterEach(() => vi.unstubAllGlobals());

describe('Uploaded trial pictures', () => {
  it('loads all four uploaded pictures with A as the reference', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, blob: async () => new Blob(['picture'], { type: 'image/jpeg' }) })));
    const files = await loadTrialPictures();
    expect(files.map(file => file.name)).toEqual(['A_original.jpg', 'B_object.jpg', 'C_text.jpg', 'D_can.jpg']);
    expect(files.every(file => file.type === 'image/jpeg' && file.size > 0)).toBe(true);
    expect(TRIAL_PICTURES.map(picture => picture.url)).toHaveLength(4);
  });

  it('submits the trial files to the real engine without selecting its synthetic set', async () => {
    let submitted: FormData | undefined;
    vi.stubGlobal('fetch', vi.fn(async (_url, options) => {
      if (options?.method === 'POST') {
        submitted = options.body;
        return { ok: true, json: async () => ({ case_id: 'trial-case' }) };
      }
      return { ok: true, blob: async () => new Blob(['picture']) };
    }));
    await createCase({ files: await loadTrialPictures(), demo: false });
    expect(submitted?.get('use_demo')).toBe('false');
    expect(submitted?.getAll('files').map(file => typeof file === 'string' ? file : file.name)).toEqual(['A_original.jpg', 'B_object.jpg', 'C_text.jpg', 'D_can.jpg']);
  });

  it('rejects an unavailable trial image instead of loading a partial set', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })));
    await expect(loadTrialPictures()).rejects.toThrow('Could not load the trial pictures');
  });
});