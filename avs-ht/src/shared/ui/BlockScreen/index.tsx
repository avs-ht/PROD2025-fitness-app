import { RouteOff } from 'lucide-react';

import { Page } from '../Page';
import { Title } from '../Title';

import styles from './index.module.scss';

export const BlockScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <Page>
      <RouteOff className={styles.icon} />
      <Title tag='h1' className={styles.title}>
        Доступ запрещен!
      </Title>
      {children}
    </Page>
  );
};
