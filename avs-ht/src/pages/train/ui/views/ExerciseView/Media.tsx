import { useEffect, useState } from 'react';

import { getMedia } from '$/shared/db';
import { ButtonWithMedia } from '$/shared/ui';

interface MediaProps {
  videosSerieId: string | null;
  imagesSerieId: string | null;
}
export const Media = ({ videosSerieId, imagesSerieId }: MediaProps) => {
  const [videos, setVideos] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    const fetchMedia = async () => {
      getMedia('video', videosSerieId || '').then(res => setVideos(res));
      getMedia('image', imagesSerieId || '').then(res => setImages(res));
    };
    fetchMedia();
  }, [videosSerieId, imagesSerieId]);
  return (
    <>
      {videosSerieId && videos && (
        <ButtonWithMedia type='video' media={videos} />
      )}
      {imagesSerieId && images && (
        <ButtonWithMedia type='image' media={images} />
      )}
    </>
  );
};
