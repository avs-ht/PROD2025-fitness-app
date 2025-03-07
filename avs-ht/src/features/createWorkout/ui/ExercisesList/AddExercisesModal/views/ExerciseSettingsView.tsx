import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { CustomTargetInput } from '../components/CustomTargetInput';
import { HighStrainWarning } from '../components/HighStrainWarning';
import { SetupExerciseValues } from '../setups/SetupExerciseValues';
import { SuggestGoal } from '../setups/SuggestGoal';

import {
  DEFAULT_EXERCISE_SETTINGS_STATE,
  exerciseSettingsAtom
} from '$/features/createWorkout/model/exerciseSettingsAtom';
import { workoutFormAtom } from '$/features/createWorkout/model/workoutFormAtom';
import { getExerciseById } from '$/pages/exercises/lib/getExercise';
import {
  FILTERS_CATEGORIES,
  FILTERS_CATEGORIES_NAME,
  TARGETS_OPTION_CONTENT,
  TARGET_OPTIONS
} from '$/shared/constants';
import { FiltersKeys, TargetType, WorkoutExercise } from '$/shared/types';
import { Button, Select, Title } from '$/shared/ui';
import { UnitsInput } from '$/shared/ui/UnitsUnput';
import styles from './ExerciseSettingsView.module.scss';

export const ExerciseSettingsView = ({
  editingExerciseIndex
}: {
  editingExerciseIndex: number | undefined;
}) => {
  const [{ exerciseId, customTarget }, setExerciseSetting] =
    useAtom(exerciseSettingsAtom);
  const [workoutFormValue, setWorkoutForm] = useAtom(workoutFormAtom);
  const [targetType, setTargetType] = useState<TargetType>('custom');
  const [targetValue, setTargetValue] = useState({
    inputValue: 0,
    inputUnit: Object.keys(TARGETS_OPTION_CONTENT.time)[0]
  });
  useEffect(() => {
    if (typeof editingExerciseIndex === 'number') {
      setExerciseSetting({
        exerciseId: workoutFormValue.exercises[editingExerciseIndex].exerciseId,
        customTarget: null
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingExerciseIndex]);

  if (!exerciseId) return;

  const exercise = getExerciseById(exerciseId);
  if (!exercise) return;

  const options = Object.entries(TARGET_OPTIONS).map(([key, value]) => ({
    value: key,
    label: value
  }));

  const CurrUnitInput = targetType !== 'custom' && UnitsInput[targetType];
  const deleteWorkoutExercise = () => {
    setExerciseSetting({
      exerciseId: null,
      customTarget: null
    });
    setWorkoutForm({
      ...workoutFormValue,
      exercises: workoutFormValue.exercises
        .map((ex, index) => {
          if (index === editingExerciseIndex) return false;
          return ex;
        })
        .filter(ex => !!ex)
    });
  };
  const createNewWorkoutExercise = (
    addFunc: (newExerciseObj: WorkoutExercise) => void
  ) => {
    const newExerciseObj: WorkoutExercise = {
      exerciseId,
      targetType,
      targetValue: targetValue.inputValue,
      targetUnit: targetValue.inputUnit,
      customTarget: customTarget || undefined
    };
    addFunc(newExerciseObj);
    setTargetValue({
      inputValue: 0,
      inputUnit: Object.keys(TARGETS_OPTION_CONTENT.time)[0]
    });
    setExerciseSetting(DEFAULT_EXERCISE_SETTINGS_STATE);
  };
  const addNewExercise = (newExerciseObj: WorkoutExercise) => {
    setWorkoutForm({
      ...workoutFormValue,
      exercises: [...workoutFormValue.exercises, newExerciseObj]
    });
  };
  const addEditedExercise = (newExerciseObj: WorkoutExercise) => {
    setWorkoutForm({
      ...workoutFormValue,
      exercises: workoutFormValue.exercises.map((exercise, index) => {
        if (index === editingExerciseIndex) {
          return newExerciseObj;
        }
        return exercise;
      })
    });
  };
  const isEditingExercise = typeof editingExerciseIndex === 'number';

  const addingFunction = isEditingExercise ? addEditedExercise : addNewExercise;

  return (
    <>
      {!isEditingExercise && (
        <SuggestGoal
          exerciseName={exercise.title}
          setTargetValue={setTargetValue}
          setTargetType={setTargetType}
        />
      )}
      {isEditingExercise && (
        <SetupExerciseValues
          exerciseIndex={editingExerciseIndex}
          setTargetValue={setTargetValue}
          setTargetType={setTargetType}
        />
      )}
      <Title>{exercise.title}</Title>
      <ul className={styles.filtersList}>
        {Object.entries(FILTERS_CATEGORIES).map(([key, value]) => {
          const exerciseKey = (
            key === 'type' ? 'exerciseType' : key
          ) as keyof typeof exercise;
          return (
            <Title textAlign='left' tag='li' key={key}>
              {FILTERS_CATEGORIES_NAME[key as FiltersKeys]}:{' '}
              {value[exercise[exerciseKey] as keyof typeof value]}
            </Title>
          );
        })}
      </ul>
      <Title tag='span' textAlign='left' className={styles.targetTitle}>
        Установим вашу цель для упражнения:
      </Title>
      <Select
        placeholder={'Выберите цель'}
        options={options}
        value={targetType}
        onChange={value => {
          const typedValue = value as TargetType;
          setTargetType(typedValue);
          if (typedValue === 'custom' || typedValue === 'times') return;
          setTargetValue({
            inputValue: 0,
            inputUnit: Object.keys(TARGETS_OPTION_CONTENT[typedValue])[0]
          });
        }}
      />
      {CurrUnitInput && (
        <>
          <CurrUnitInput value={targetValue} setValue={setTargetValue} />
          <HighStrainWarning value={targetValue} type={targetType} />
        </>
      )}
      {targetType === 'custom' && <CustomTargetInput />}
      <div className={styles.buttons}>
        {isEditingExercise && (
          <Button type='button' onClick={deleteWorkoutExercise} deleteButton>
            Удалить из списка
          </Button>
        )}
        <Button
          type='button'
          onClick={() => createNewWorkoutExercise(addingFunction)}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
