import { useAtom } from 'jotai';
import {
  Control,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetFocus
} from 'react-hook-form';

import { FILTERS_PLACEHOLDERS } from '../../constants';
import { formAtom } from '../../model/formAtom';
import { FormValues } from '../AddExerciseForm';

import { FILTERS_CATEGORIES } from '$/shared/constants';
import { FiltersKeys } from '$/shared/types';
import { Input, Select, Textarea } from '$/shared/ui';

interface FirstStepProps {
  register: UseFormRegister<FormValues>;
  control: Control<FormValues, unknown>;
  setFocus: UseFormSetFocus<FormValues>;
  errorMessage?: string;
  clearErrors?: UseFormClearErrors<FormValues>;
}

export const FirstStep = (props: FirstStepProps) => {
  const { register, control, setFocus, errorMessage, clearErrors } = props;
  const [form, setForm] = useAtom(formAtom);
  const { filters: defaultFilters } = form;
  const setDefaultFilters = (filters: typeof defaultFilters) => {
    setForm({ ...form, filters });
  };

  const titleRegister = register?.('title');

  return (
    <>
      <Input
        {...titleRegister}
        labelName='Название'
        setFocus={() => setFocus?.('title')}
        errorMessage={errorMessage}
        onChange={e => {
          titleRegister.onChange?.(e);
          clearErrors?.('title');
        }}
      />
      <Textarea control={control} labelName='Описание' name='description' />
      {Object.keys(FILTERS_CATEGORIES).map(category => (
        <Select
          key={category}
          placeholder={FILTERS_PLACEHOLDERS[category as FiltersKeys]}
          options={Object.entries(
            FILTERS_CATEGORIES[category as FiltersKeys]
          ).map(([key, value]) => ({ value: key, label: value }))}
          value={defaultFilters[category as FiltersKeys]}
          onChange={value => {
            setDefaultFilters({
              ...defaultFilters,
              [category]: value
            });
          }}
        />
      ))}
    </>
  );
};
