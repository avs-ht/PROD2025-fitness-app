import { AVAIBLE_FILE_EXTENSIONS } from '../constants';

interface Props {
  files: FileList | null;
  maxFileAmounts: number;
  maxFileSize: number;
  type: 'video' | 'image';
  uploadedFilesLength: number;
}
export const checkFiles = (props: Props) => {
  const { files, maxFileSize, maxFileAmounts, uploadedFilesLength, type } =
    props;
  if (!files || files.length === 0)
    return 'Произошла ошибка: файлы не удалось загрузить :(';

  if (files.length + uploadedFilesLength > maxFileAmounts)
    return `Всего можно загрузить пять ${maxFileAmounts} ${type === 'image' ? 'фото' : 'видео'}!`;

  for (const file of files) {
    if (!AVAIBLE_FILE_EXTENSIONS[type].includes(file.type.split('/')[1]))
      return 'Недопустимое расширение файла!';
    if (file.size > maxFileSize * 1024 * 1024) {
      return (
        `${type === 'image' ? 'Фото' : 'Видео'} не должны превышать ${maxFileSize} МБ!\n` +
        `${file.name} весит ${file.size / 1024 / 1024} МБ`
      );
    }
  }

  return true;
};
