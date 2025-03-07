import { Outlet } from '@tanstack/react-router';

import { useWindowSize } from '$/shared/lib/hooks/useWindowSize';
import { Footer } from './Footer';
import styles from './NavLayout.module.scss';
import { Sidebar } from './Sidebar';

const TABLET_BREAKPOINT = 850;
export const NavLayout = () => {
  const { width } = useWindowSize();
  return (
    <>
      {width > TABLET_BREAKPOINT ? <Sidebar /> : <Footer />}
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};
