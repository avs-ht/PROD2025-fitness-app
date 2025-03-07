import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { IFormAtom, formAtom } from '../model/formAtom';

import { getExerciseById } from '$/pages/exercises/lib/getExercise';
import { db } from '$/shared/db';
import { LoadScreen } from '$/shared/ui';
import { FormValues } from './AddExerciseForm';

interface EditPresetProps {
  id: string;
  setValue: UseFormSetValue<FormValues>;
}
export const EditPreset = ({ id, setValue }: EditPresetProps) => {
  const setForm = useSetAtom(formAtom);
  const [isPresetLoaded, setPresetLoaded] = useState(false);
  useEffect(() => {
    const exerciseInfo = getExerciseById(id);
    if (!exerciseInfo) {
      alert('Не получилось загрузить');
      return;
    }
    const {
      tags,
      equipment,
      difficulty,
      exerciseType,
      muscle,
      imagesSerieId,
      videosSerieId
    } = exerciseInfo;
    const formValue: IFormAtom = {
      images: [],
      videos: [],
      filters: {
        difficulty,
        muscle,
        type: exerciseType
      },
      equipment,
      tags
    };

    const getMedia = async () => {
      try {
        if (imagesSerieId) {
          const res = await db.images.get(imagesSerieId);
          if (res) formValue.images = res.files;
        }
        if (videosSerieId) {
          const res = await db.videos.get(videosSerieId);
          if (res) formValue.videos = res.files;
        }
      } catch {
        alert('Не получилось загрузить медиа данные :(');
      }
    };
    getMedia().finally(() => {
      setForm(formValue);
      setValue('title', exerciseInfo.title);
      setValue('description', exerciseInfo?.description || '');
      setPresetLoaded(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <LoadScreen isLoadScreenShowed={!isPresetLoaded} />;
};
