import { Link } from '@tanstack/react-router';

import { Button, Page, Title } from '$/shared/ui';
import { ActivitySelect } from './ActivitySelect';
import { GenderSelect } from './GenderSelect';
import { PhysicalCharacteristics } from './PhysicalCharacteres';
import styles from './ProfilePage.module.scss';

export const ProfilePage = () => {
  return (
    <Page contentCentering={false}>
      <div className={styles.content}>
        <Title className={styles.title}>Ваш профиль</Title>
        <GenderSelect />
        <PhysicalCharacteristics />
        <ActivitySelect />
        <div className={styles.buttons}>
          <Button link>
            <Link to='/profile/achievements'>Достижения</Link>
          </Button>
        </div>
      </div>
    </Page>
  );
};
