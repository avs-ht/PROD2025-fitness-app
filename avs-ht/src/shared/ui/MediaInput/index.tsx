import { OpenedMedia } from '..';
import { ImageUp } from 'lucide-react';
import { useState } from 'react';

import { AVAIBLE_FILE_EXTENSIONS } from './constants';
import styles from './index.module.scss';
import { checkFiles } from './lib/checkFiles';

type MB = number;
interface MediaInputProps {
  type: 'video' | 'image';
  maxFileAmounts: number;
  maxFileSize: MB;

  addFiles: (file: File[]) => void;
  deleteFile: (file: File) => void;
  value: File[];
}

export const MediaInput = (props: MediaInputProps) => {
  const { type, maxFileAmounts, maxFileSize, value, deleteFile, addFiles } =
    props;

  const isFileAmountLimit = value.length >= maxFileAmounts;
  const [isMediaModalOpened, setMediaModalOpened] = useState(false);
  const [clickedFile, setClickedFile] = useState<File | null>(null);
  return (
    <div className={styles.container}>
      <div
        className={styles.inputContainer}
        data-file-limit={isFileAmountLimit}>
        <div className={styles.content}>
          {!isFileAmountLimit ? (
            <>
              <span>
                Загрузите {type === 'image' ? 'изображение' : 'видео'}
              </span>
              <ImageUp size={32} />
            </>
          ) : (
            <>
              <span>Лимит {type === 'image' ? 'изображений' : 'видео'}</span>
              <ImageUp size={32} />
            </>
          )}
        </div>
        <input
          disabled={value.length >= maxFileAmounts}
          className={styles.input}
          type='file'
          multiple={maxFileAmounts > 1}
          onChange={e => {
            const files = e.target.files;
            const checkFilesRes = checkFiles({
              maxFileAmounts,
              maxFileSize,
              files,
              type,
              uploadedFilesLength: value.length
            });

            if (typeof checkFilesRes === 'string') {
              alert(checkFilesRes);
              return;
            }

            addFiles(Array.from(files || []));
            e.currentTarget.value = '';
          }}
          accept={type === 'image' ? 'image/*' : 'video/*'}
        />
      </div>
      <div className={styles.signs}>
        <span>Макс. кол-во файлов - {maxFileAmounts}</span>
        <span>Макс. размер файлов - {maxFileSize} МБ</span>
        <span>Разрешенные форматы:</span>
        <span>
          {AVAIBLE_FILE_EXTENSIONS[type].map(ext => `.${ext}`).join(' ')}
        </span>
      </div>
      <ul className={styles.files}>
        {value.map(file => {
          return (
            <li key={file.name} className={styles.uploadedFile}>
              {type === 'video' && (
                <video src={URL.createObjectURL(file)}></video>
              )}
              {type === 'image' && (
                <img src={URL.createObjectURL(file)} alt={file.name} />
              )}
              <button
                type='button'
                onClick={() => {
                  setMediaModalOpened(true);
                  setClickedFile(file);
                }}
                className={styles.openImageButton}></button>
              {clickedFile === file && (
                <OpenedMedia
                  files={{ files: [file], id: '' }}
                  isOpened={isMediaModalOpened}
                  type={type}
                  setOpened={isOpened => setMediaModalOpened(isOpened)}
                />
              )}
              <button
                type='button'
                onClick={() => deleteFile(file)}
                className={styles.deleteImageButton}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
