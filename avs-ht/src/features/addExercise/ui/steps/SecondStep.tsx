import { useAtom } from 'jotai';

import { formAtom } from '../../model/formAtom';

import { MediaInput } from '$/shared/ui';
import styles from './SecondStep.module.scss';

export const SecondStep = () => {
  const [form, setForm] = useAtom(formAtom);
  const { images, videos } = form;
  const setImages = (files: File[]) => {
    setForm({ ...form, images: files });
  };
  const setVideos = (files: File[]) => {
    setForm({ ...form, videos: files });
  };
  return (
    <div className={styles.mediaInputs}>
      <MediaInput
        type='image'
        maxFileSize={20}
        maxFileAmounts={5}
        addFiles={v => setImages([...images, ...v])}
        deleteFile={v => setImages(images.filter(f => f !== v))}
        value={images}
      />
      <MediaInput
        type='video'
        maxFileSize={1024}
        maxFileAmounts={1}
        addFiles={v => setVideos([...videos, ...v])}
        deleteFile={v => setVideos(videos.filter(f => f !== v))}
        value={videos}
      />
    </div>
  );
};
