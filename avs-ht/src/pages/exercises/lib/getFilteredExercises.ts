import { IFilters } from '../model/filtersAtom';

import { Exercise } from '$/shared/types';

export const getFilteredExercises = (
  exercises: Exercise[],
  filters: IFilters
) => {
  const {
    type: fType,
    difficulty: fDifficulty,
    muscle: fMuscle,
    tags: fTags,
    equipment: fEquipment
  } = filters;
  const isFiltersEmpty =
    fType.length +
      fDifficulty.length +
      fMuscle.length +
      fTags.length +
      fEquipment.length ===
    0;

  if (isFiltersEmpty) return exercises;

  return exercises.filter(exercise => {
    const {
      exerciseType: eType,
      difficulty: eDifficulty,
      muscle: eMuscle,
      tags: eTags,
      equipment: eEquipment
    } = exercise;
    const isDiffucltyImportant = !!fDifficulty.length;
    const isMuscleImportant = !!fMuscle.length;
    const isTypeImportant = !!fType.length;
    const isTagsImportant = !!fTags.length;
    const isEquipmentImportant = !!fEquipment.length;

    return [
      !isDiffucltyImportant || fDifficulty.includes(eDifficulty),
      !isTypeImportant || fType.includes(eType),
      !isMuscleImportant || fMuscle.includes(eMuscle),
      !isTagsImportant || fTags.every(tag => eTags.includes(tag)),
      !isEquipmentImportant || fEquipment.every(eq => eEquipment.includes(eq))
    ].every(Boolean);
  });
};
