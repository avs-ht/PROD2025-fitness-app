import { Link } from '@tanstack/react-router';

import { ID } from '$/shared/types';
import { BlockScreen, Button, Title } from '$/shared/ui';
import styles from './BlockScreen.module.scss';

export const EditBlockScreen = ({ id }: ID) => {
  return (
    <BlockScreen>
      <Title className={styles.title}>
        У вас есть незаконченная тренировка, в которую входит этот упражнение!
      </Title>
      <Button link>
        <Link to='/train' search={{ id }}>
          Перейти к тренировке
        </Link>
      </Button>
    </BlockScreen>
  );
};
