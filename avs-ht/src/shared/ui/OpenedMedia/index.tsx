import { Modal } from '..';

import { Image, Video } from '$/shared/db';
import { Images } from './Images';
import styles from './index.module.scss';

interface OpenedMediaProps {
  files: Video | Image;
  isOpened: boolean;
  type: 'image' | 'video';
  setOpened: (isOpened: boolean) => void;
}
export const OpenedMedia = ({
  files,
  type,
  isOpened,
  setOpened
}: OpenedMediaProps) => {
  return (
    <>
      {isOpened && (
        <Modal
          setModalOpened={setOpened}
          contentClassName={styles.content}
          closeButtonClassName={type === 'image' ? styles.closeButton : ''}>
          {type === 'image' && <Images files={files as Image} />}
          {type === 'video' && (
            <video
              src={URL.createObjectURL(files.files[0])}
              className={styles.video}
              controls
            />
          )}
        </Modal>
      )}
    </>
  );
};
