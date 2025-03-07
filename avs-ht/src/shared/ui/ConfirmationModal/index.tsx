import { Button } from '../Button';
import { Modal } from '../Modal';

import styles from './index.module.scss';

interface ConfirmationModalProps {
  isModalShowed: boolean;
  setModalShowed: (isModalShowed: boolean) => void;
  children: React.ReactNode;
  confirmFunc: () => void;
  cancelFunc?: () => void;
}
export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { isModalShowed, children, setModalShowed, confirmFunc, cancelFunc } =
    props;

  const cancel = cancelFunc
    ? () => {
        setModalShowed(false);
        cancelFunc();
      }
    : () => setModalShowed(false);

  const confirm = () => {
    setModalShowed(false);
    confirmFunc();
  };
  return (
    <>
      {isModalShowed && (
        <Modal
          setModalOpened={setModalShowed}
          contentClassName={styles.modalContent}>
          <div className={styles.text}>{children}</div>
          <div className={styles.buttons}>
            <Button onClick={confirm}>Подтвердить</Button>
            <Button deleteButton onClick={cancel}>
              Отмена
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
