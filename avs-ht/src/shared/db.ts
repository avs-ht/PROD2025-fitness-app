import Dexie, { type EntityTable } from 'dexie';

type Video = {
  id: string;
  files: File[];
};
type Image = Video;

const db = new Dexie('media') as Dexie & {
  videos: EntityTable<Video, 'id'>;
  images: EntityTable<Image, 'id'>;
};

db.version(1).stores({
  videos: '++id, file',
  images: '++id, file'
});

export type { Video, Image };
export { db };

export const getMedia = async (type: 'image' | 'video', id: string) => {
  try {
    const mediaKey = type === 'image' ? 'images' : 'videos';
    return (await db[mediaKey].get(id))?.files || ([] as File[]);
  } catch {
    return [] as File[];
  }
};
