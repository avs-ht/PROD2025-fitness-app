import { db } from '$/shared/db';

export const uploadMedia = async (files: File[], type: 'image' | 'video') => {
  if (files.length === 0) return null;
  try {
    if (type === 'image') {
      const id = await db.images.add({ files });
      return id;
    } else {
      const id = await db.videos.add({ files });
      return id;
    }
  } catch {
    return null;
  }
};
