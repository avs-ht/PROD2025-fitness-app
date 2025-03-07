import { EQUIPMENT_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { OptionType } from '$/shared/types';

export const getEquipment = (equipmentId: string) => {
  const storage = getStorage<OptionType[]>(EQUIPMENT_LOCAL_STORAGE_KEY);
  return storage.find(item => item.value === equipmentId)?.label;
};
