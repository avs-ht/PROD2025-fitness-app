import { FIRST_TIME_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Page } from '$/shared/ui';
import styles from './WelcomePage.module.scss';
import { GuestView } from './views/GuestView';
import { TrainedUserView } from './views/TrainedUserView';

export const WelcomePage = () => {
  const isFirstTime = getStorage(FIRST_TIME_LOCAL_STORAGE_KEY) !== 'false';
  return (
    <Page>
      <section className={styles.container}>
        {isFirstTime ? <GuestView /> : <TrainedUserView />}
      </section>
    </Page>
  );
};
