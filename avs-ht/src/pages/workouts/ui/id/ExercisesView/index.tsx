import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getExerciseById } from '$/pages/exercises';
import { getMedia } from '$/shared/db';
import { useArrayIndex } from '$/shared/lib/hooks';
import { WorkoutExercise } from '$/shared/types';
import { Title } from '$/shared/ui';
import { ButtonWithMedia } from '$/shared/ui/ButtonWithMedia';
import { FiltersInfo } from './FiltersInfo';
import styles from './index.module.scss';

interface ExercisesViewProps {
  exercises: WorkoutExercise[];
}
export const ExercisesView = ({ exercises }: ExercisesViewProps) => {
  const {
    index: exerciseIndex,
    reduceIndex,
    increaseIndex
  } = useArrayIndex(exercises);
  const currentExercise = getExerciseById(exercises[exerciseIndex]?.exerciseId);
  const [videos, setVideos] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    const fetchMedia = async () => {
      const videos = await getMedia(
        'video',
        currentExercise?.videosSerieId || ''
      );
      setVideos(videos);
      const images = await getMedia(
        'image',
        currentExercise?.imagesSerieId || ''
      );
      setImages(images);
    };

    fetchMedia();
  }, [currentExercise?.videosSerieId, currentExercise?.imagesSerieId]);

  if (exercises.length === 0) return 'Упражнений нет';

  return (
    <div className={styles.container}>
      <div className={styles.exerciseInfo}>
        {currentExercise ? (
          <div className={styles.exerciseContent}>
            <Title className={styles.title}>
              {exerciseIndex + 1}. {currentExercise.title}
            </Title>
            <FiltersInfo exercise={currentExercise} />
            <div className={styles.mediaButtons}>
              {currentExercise.imagesSerieId && images.length > 0 && (
                <ButtonWithMedia type='image' media={images} />
              )}
              {currentExercise.videosSerieId && videos.length > 0 && (
                <ButtonWithMedia type='video' media={videos} />
              )}
            </div>
          </div>
        ) : (
          'Упражнение не найдено'
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.prevExerciseButton} onClick={reduceIndex}>
          <ChevronLeft size={24} />
        </button>
        <button className={styles.nextExerciseButton} onClick={increaseIndex}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};
