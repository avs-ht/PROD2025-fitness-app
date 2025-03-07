import { TAGS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { OptionType } from '$/shared/types';

export const getTag = (tagId: string) => {
  const storage = getStorage<OptionType[]>(TAGS_LOCAL_STORAGE_KEY);
  return storage.find(tag => tag.value === tagId)?.label;
};
