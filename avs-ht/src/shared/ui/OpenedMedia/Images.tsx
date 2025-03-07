import { ChevronFirst, ChevronLast } from 'lucide-react';
import { useState } from 'react';

import { Image } from '$/shared/db';
import styles from './Images.module.scss';

export const Images = ({ files: { files: imageFiles } }: { files: Image }) => {
  const [index, setIndex] = useState(0);
  return (
    <>
      {imageFiles.length > 1 && (
        <button
          className={styles.prevButton}
          onClick={() => {
            setIndex(prev => {
              return prev === 0 ? imageFiles.length - 1 : prev - 1;
            });
          }}>
          <ChevronFirst />
        </button>
      )}
      <img
        src={URL.createObjectURL(imageFiles?.[index])}
        alt={imageFiles?.[index].name}
        className={styles.image}
      />
      {imageFiles.length > 1 && (
        <button
          className={styles.nextButton}
          onClick={() => {
            setIndex(prev => (prev + 1) % imageFiles.length);
          }}>
          <ChevronLast />
        </button>
      )}
    </>
  );
};
