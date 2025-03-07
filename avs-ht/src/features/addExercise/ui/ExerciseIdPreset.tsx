interface ExerciseIdPresetProps {
  id: string;
  setValues?: Record<string, () => void>;
}
export const ExerciseIdPreset = ({ setValues, id }: ExerciseIdPresetProps) => {
  return (
    <>
      {setValues?.setDefaultFilters()}
      {id}
    </>
  );
};
