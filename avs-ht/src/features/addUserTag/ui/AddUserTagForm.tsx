import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';
import { OptionType } from '$/shared/types';
import { Button, Input } from '$/shared/ui';
import styles from './AddUserTagForm.module.scss';
import { TagItem } from './TagItem';

interface AddUserTagFormProps {
  localStorageKey: string;
  itemNameToAdd?: string;
  setupCurrTags: React.Dispatch<
    React.SetStateAction<{ value: string; label: string }[]>
  >;
}

interface FormProps {
  itemName: string;
}
export const AddUserTagForm = (props: AddUserTagFormProps) => {
  const { localStorageKey, itemNameToAdd, setupCurrTags } = props;
  const storage = () => getStorage<OptionType[]>(localStorageKey);
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      itemName: ''
    }
  });

  const isButtonDisabled = !!errors.itemName;
  const createTag = ({ itemName }: FormProps) => {
    if (isButtonDisabled) return;
    if (itemName === '') {
      setError('itemName', {
        message: 'Поле не может быть пустым'
      });
      return;
    }
    const currItems = storage();
    const newItems = [...currItems, { label: itemName, value: uuidv4() }];
    setStorage(localStorageKey, newItems);
    setupCurrTags(newItems);
    reset();
    toast.success('Тег добавлен');
  };

  const inputProps = {
    ...register('itemName')
  };
  const listOfTags =
    getValues('itemName').length === 0
      ? []
      : storage().filter(
          item => item.label.indexOf(getValues('itemName')) !== -1
        );
  const formName = `add${localStorageKey}Form`;

  return (
    <form onSubmit={handleSubmit(createTag)} id={formName}>
      <div className={styles.addField}>
        <Input
          {...inputProps}
          errorMessage={errors.itemName?.message}
          onKeyDown={e => {
            if (e.key === 'Enter' && e.currentTarget === e.target) {
              handleSubmit(createTag)();
            }
          }}
          onChange={e => {
            inputProps.onChange(e);
            if (
              storage().find(
                (item: OptionType) => item.label === e.target.value
              )
            ) {
              setError('itemName', {
                message: 'Такой тег уже есть!'
              });
              return;
            }
            clearErrors('itemName');
          }}
          labelName={itemNameToAdd || 'Новый тег'}
          setFocus={() => setFocus('itemName')}
        />
        <Button
          type='button'
          className={styles.addButton}
          form={formName}
          disabled={isButtonDisabled}
          onClick={() => {
            handleSubmit(createTag)();
          }}>
          Добавить
        </Button>
      </div>
      {getValues('itemName') === '' && (
        <span className={styles.hint}>
          Вы можете искать уже существующие теги
        </span>
      )}
      <ul className={styles.listOfTags}>
        {listOfTags.map((item: OptionType) => (
          <TagItem
            key={item.value}
            tagOption={item}
            localStorageKey={localStorageKey}
            setupCurrOptions={setupCurrTags}
            tagActionCallback={name => {
              if (errors.itemName && getValues('itemName') === name) {
                clearErrors();
              }
            }}
          />
        ))}
      </ul>
    </form>
  );
};
