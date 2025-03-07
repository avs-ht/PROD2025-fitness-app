import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { uploadMedia } from '../lib/uploadMedia';
import { DEFAULT_FORM_ATOM_STATE, formAtom } from '../model/formAtom';

import { getExerciseById } from '$/pages/exercises/lib/getExercise';
import { EXERCISES_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { db } from '$/shared/db';
import { getStorage, setStorage } from '$/shared/lib/localStorageApi';
import { DefaultFilters } from '$/shared/types';
import { Exercise } from '$/shared/types';
import { Button, LoadScreen, Title } from '$/shared/ui';
import styles from './AddExerciseForm.module.scss';
import { DeleteButton } from './DeleteButton';
import { EditPreset } from './EditPreset';
import { FiltersPreset } from './FiltersPreset';
import { FirstStep, SecondStep, ThirdStep } from './steps';

interface AddExerciseFormProps {
  preset?: string;
  exerciseId?: string;
}

export interface FormValues {
  title: string;
  description?: string;
  filters: DefaultFilters;
}
export const AddExerciseForm = (props: AddExerciseFormProps) => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useAtom(formAtom);
  const [currStep, setCurrStep] = useState(0);
  const [isCreatingFile, setCreatingFile] = useState(false);
  const { preset, exerciseId } = props;

  const {
    register,
    getValues,
    control,
    setFocus,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: ''
    }
  });
  const formSettings = {
    register,
    control,
    setFocus,
    clearErrors,
    errorMessage: errors.title?.message
  };

  const createExercise = async (data: FormValues) => {
    if (isCreatingFile) return;
    const {
      videos,
      images,
      filters: { difficulty, type, muscle },
      ...otherValue
    } = formValue;
    setCreatingFile(true);
    const imagesSerieId = await uploadMedia(images, 'image');
    const videosSerieId = await uploadMedia(videos, 'video');
    if (preset === 'edit' && exerciseId) {
      const exerciseInfo = getExerciseById(exerciseId);
      if (exerciseInfo?.imagesSerieId) {
        await db.images.delete(exerciseInfo.imagesSerieId);
      }
      if (exerciseInfo?.videosSerieId) {
        await db.images.delete(exerciseInfo.videosSerieId);
      }
    }
    const newExercise: Exercise = {
      id: exerciseId || uuidv4(),
      ...data,
      ...otherValue,
      exerciseType: type,
      muscle,
      difficulty,
      imagesSerieId,
      videosSerieId
    };
    if (preset !== 'edit') {
      setStorage(EXERCISES_LOCAL_STORAGE_KEY, [
        ...getStorage<Exercise[]>(EXERCISES_LOCAL_STORAGE_KEY),
        newExercise
      ]);
    } else {
      setStorage(EXERCISES_LOCAL_STORAGE_KEY, [
        ...getStorage<Exercise[]>(EXERCISES_LOCAL_STORAGE_KEY).filter(
          item => item.id !== exerciseId
        ),
        newExercise
      ]);
    }
    setFormValue(DEFAULT_FORM_ATOM_STATE);
    setCreatingFile(false);
    navigate({
      to: '/exercises/$id',
      params: {
        id: newExercise.id
      }
    });
  };

  const steps = [
    () => (
      <div>
        <Title tag='h4'>1. Основная информация</Title>
        <FirstStep {...formSettings} />
      </div>
    ),
    () => (
      <div>
        <Title tag='h4'>2. Видео и изображения</Title>
        <SecondStep />
      </div>
    ),
    () => (
      <div>
        <Title tag='h4'>3. Дополнительные настройки</Title>
        <ThirdStep />
      </div>
    )
  ];

  const isEditPreset = preset === 'edit' && exerciseId;
  const isFiltersPreset = preset === 'filters';
  return (
    <>
      {isFiltersPreset && <FiltersPreset />}
      {isEditPreset && <EditPreset id={exerciseId} setValue={setValue} />}
      <LoadScreen isLoadScreenShowed={isCreatingFile} />
      <Title tag='h3' hidden>
        Добавить упражнение
      </Title>

      <form onSubmit={handleSubmit(createExercise)} className={styles.form}>
        {steps[currStep]()}
        <div className={styles.changeStepButtons}>
          {currStep > 0 && (
            <Button
              type='button'
              className={styles.backButton}
              onClick={() => setCurrStep(prev => prev - 1)}>
              Вернуться назад
            </Button>
          )}
          {currStep < steps.length - 1 && (
            <Button
              type='button'
              className={styles.forwardButton}
              onClick={() => {
                if (getValues('title') === '') {
                  setError('title', {
                    message: 'Поле не должно быть пустым'
                  });
                  return;
                }
                setCurrStep(prev => prev + 1);
              }}>
              Следующий шаг
            </Button>
          )}
          {currStep === steps.length - 1 && (
            <Button disabled={isCreatingFile}>
              {preset === 'edit' ? 'Сохранить' : 'Создать'}
            </Button>
          )}
        </div>
        {isEditPreset && <DeleteButton id={exerciseId} />}
      </form>
    </>
  );
};
