import { useAtom } from 'jotai';
import { useState } from 'react';

import { formAtom } from '../../model/formAtom';

import { AddUserTagForm } from '$/features/addUserTag';
import {
  EQUIPMENT_LOCAL_STORAGE_KEY,
  TAGS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { OptionType } from '$/shared/types';
import { Modal, MultipleSelect } from '$/shared/ui';

export const ThirdStep = () => {
  const [form, setForm] = useAtom(formAtom);
  const { tags, equipment } = form;
  const setTags = (tags: string[]) => {
    setForm({ ...form, tags });
  };
  const setEquipment = (equipment: string[]) => {
    setForm({ ...form, equipment });
  };

  const [isTagsModalOpened, setTagsModalOpened] = useState(false);
  const [isEquipmentModalOpened, setEquipmentModalOpened] = useState(false);

  const [equipmentOptions, setEquipmentOptions] = useState<OptionType[]>([
    ...JSON.parse(localStorage.getItem(EQUIPMENT_LOCAL_STORAGE_KEY) || '[]')
  ]);
  const [userTagsOptions, setUserTagsOptions] = useState<OptionType[]>([
    ...JSON.parse(localStorage.getItem(TAGS_LOCAL_STORAGE_KEY) || '[]')
  ]);

  return (
    <>
      {isEquipmentModalOpened && (
        <Modal setModalOpened={setEquipmentModalOpened}>
          <AddUserTagForm
            itemNameToAdd='Новое снаряжение'
            setupCurrTags={setEquipmentOptions}
            localStorageKey={EQUIPMENT_LOCAL_STORAGE_KEY}
          />
        </Modal>
      )}
      {isTagsModalOpened && (
        <Modal setModalOpened={setTagsModalOpened}>
          <AddUserTagForm
            setupCurrTags={setUserTagsOptions}
            localStorageKey={TAGS_LOCAL_STORAGE_KEY}
          />
        </Modal>
      )}
      <MultipleSelect
        title='Инвентарь для упражнения'
        options={equipmentOptions}
        value={equipment}
        setValues={setEquipment}
        addButtonFunc={() => setEquipmentModalOpened(true)}
        addButtonText='Редактировать снаряжение'
        placholder='Добавьте снаряжение'
      />
      <MultipleSelect
        title='Ваши теги'
        options={userTagsOptions}
        value={tags}
        setValues={setTags}
        addButtonFunc={() => setTagsModalOpened(true)}
        addButtonText='Редактировать тэги'
        placholder='Добавьте тэг'
      />
    </>
  );
};
