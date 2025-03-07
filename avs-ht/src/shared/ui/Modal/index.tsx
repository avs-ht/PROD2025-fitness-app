import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Portal } from '../Portal';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface ModalProps {
  children: React.ReactNode;
  setModalOpened: (opened: boolean) => void;
  contentClassName?: string;
  backgroundClassName?: string;
  closeButtonClassName?: string;
}
export const Modal = ({
  children,
  setModalOpened,
  contentClassName,
  backgroundClassName,
  closeButtonClassName
}: ModalProps) => {
  const closeModal = () => {
    setModalOpened(false);
  };
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const closeByEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keyup', closeByEsc);
    return () => document.removeEventListener('keyup', closeByEsc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Portal>
      <div
        data-modal
        className={clsx(styles.modalBackground, backgroundClassName)}
        ref={backgroundRef}
        onClick={e => {
          if (e.target === backgroundRef.current) closeModal();
        }}>
        <div className={clsx(styles.modalContent, contentClassName)}>
          {children}
          <button
            type='button'
            onClick={closeModal}
            className={clsx(styles.closeButton, closeButtonClassName)}>
            <X />
          </button>
        </div>
      </div>
    </Portal>
  );
};
