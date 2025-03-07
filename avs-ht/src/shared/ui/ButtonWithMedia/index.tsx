import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../Button';
import { Modal } from '../Modal';

import { useArrayIndex } from '$/shared/lib/hooks';
import styles from './index.module.scss';

interface ButtonWithMediaProps {
  type: 'image' | 'video';
  media: File[];
  buttonClassname?: string;
}

export const ButtonWithMedia = (props: ButtonWithMediaProps) => {
  const { type, buttonClassname, media } = props;
  const [isModalWithImageOpened, setModalWithImageOpened] = useState(false);
  const {
    index: currIndexOfMedia,
    reduceIndex,
    increaseIndex
  } = useArrayIndex(media);
  if (media && media.length === 0) return;
  const srcStr = URL.createObjectURL(media[currIndexOfMedia]);

  return (
    <>
      {isModalWithImageOpened && (
        <Modal
          setModalOpened={setModalWithImageOpened}
          contentClassName={styles.contentModal}>
          {type === 'image' ? (
            <img src={srcStr} />
          ) : (
            <video src={srcStr} controls />
          )}
          {media.length > 1 && (
            <div className={styles.changeMediaButton}>
              <button className={styles.prevMediaButton} onClick={reduceIndex}>
                <ChevronLeft />
              </button>
              <button
                className={styles.nextMediaButton}
                onClick={increaseIndex}>
                <ChevronRight />
              </button>
            </div>
          )}
        </Modal>
      )}
      {media.length > 0 && (
        <Button
          className={buttonClassname}
          type='button'
          onClick={() => setModalWithImageOpened(true)}>
          Открыть {type === 'image' ? 'изображения' : 'видео'}
        </Button>
      )}
    </>
  );
};
