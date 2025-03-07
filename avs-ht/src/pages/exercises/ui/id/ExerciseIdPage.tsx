import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import { getEquipment } from '../../lib/getEquipment';
import { getExerciseById } from '../../lib/getExercise';
import { getTag } from '../../lib/getTag';

import { Image, Video, db } from '$/shared/db';
import { Button, Page, Title } from '$/shared/ui';
import { OpenedMedia } from '$/shared/ui';
import styles from './ExerciseIdPage.module.scss';
import { DefaultFiltersDisplay } from './filters/DefaultFilters';
import { Tags } from './filters/Tags';

interface ExerciseIdPageProps {
  id: string;
}
export const ExerciseIdPage = ({ id }: ExerciseIdPageProps) => {
  const exerciseInfo = getExerciseById(id);
  const [videos, setVideos] = useState<Video | undefined>(undefined);
  const [images, setImages] = useState<Image | undefined>(undefined);
  const [isImagesModalOpened, setImagesModalOpened] = useState(false);
  const [isVideoModalOpened, setVideoModalOpened] = useState(false);
  useEffect(() => {
    const vId = exerciseInfo?.videosSerieId;
    const iId = exerciseInfo?.imagesSerieId;
    const getMedia = async () => {
      const media: {
        videos: Video | undefined;
        images: Image | undefined;
      } = {
        videos: undefined,
        images: undefined
      };
      if (vId) {
        const videoFiles = await db.videos.get(vId);
        media.videos = videoFiles;
      }
      if (iId) {
        const imageFiles = await db.images.get(iId);
        media.images = imageFiles;
      }
      return media;
    };
    getMedia().then(res => {
      setImages(res.images);
      setVideos(res.videos);
    });
  }, [exerciseInfo?.videosSerieId, exerciseInfo?.imagesSerieId]);

  if (!exerciseInfo) return;
  const {
    title,
    description,
    difficulty,
    exerciseType,
    muscle,
    tags,
    equipment
  } = exerciseInfo;

  return (
    <Page contentCentering={false}>
      <Title className={styles.title}>{title}</Title>
      <DefaultFiltersDisplay
        difficulty={difficulty}
        type={exerciseType}
        muscle={muscle}
      />
      <p className={styles.description}>{description}</p>
      <Tags
        tags={equipment.map(eqItem => getEquipment(eqItem) || '')}
        title='Для выполнения этого упражнения вам понадобится'
      />
      <Tags
        tags={tags.map(tag => getTag(tag) || '')}
        title='Теги, которые вы установили'
      />
      <div className={styles.buttons}>
        {videos?.files.length && (
          <>
            <OpenedMedia
              files={videos as unknown as Video}
              isOpened={isVideoModalOpened}
              type='video'
              setOpened={v => setVideoModalOpened(v)}
            />
            <Button
              onClick={() => {
                setVideoModalOpened(true);
              }}>
              Посмотреть видео
            </Button>
          </>
        )}
        {images?.files.length && (
          <>
            <OpenedMedia
              files={images as unknown as Image}
              isOpened={isImagesModalOpened}
              type='image'
              setOpened={v => setImagesModalOpened(v)}
            />
            <Button
              onClick={() => {
                setImagesModalOpened(true);
              }}>
              Посмотреть изображения ({images?.files.length} шт.)
            </Button>
          </>
        )}

        <Button className={styles.editButton} link>
          <Link
            to='/exercises/$id/edit'
            params={{
              id
            }}>
            Редактировать
          </Link>
        </Button>
      </div>
    </Page>
  );
};
