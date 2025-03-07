import { useLocation } from '@tanstack/react-router';
import { ChevronFirst, CirclePlus } from 'lucide-react';
import { useState } from 'react';

import { ADD_BUTTON_PAGES, NAV_ITEMS } from '../../constants';

import { Avatar } from './Avatar';
import { Logo } from './Logo';
import { SidebarItem } from './SidebarItem';
import styles from './index.module.scss';

export const Sidebar = () => {
  const [isNavOpened, setIsNavOpened] = useState(true);
  const isNavClosed = !isNavOpened;
  const { pathname } = useLocation();
  return (
    <aside className={styles.aside} data-nav-closed={isNavClosed}>
      <header className={styles.upperPart}>
        {isNavOpened && <Logo />}
        <button
          className={styles.closeButton}
          data-navclosed={isNavClosed}
          onClick={() => setIsNavOpened(prev => !prev)}>
          <ChevronFirst className={styles.closeButtonIcon} size={30} />
        </button>
      </header>
      <ul className={styles.list}>
        {NAV_ITEMS.map(item => {
          return (
            <SidebarItem {...item} key={item.path} isNavOpened={isNavOpened} />
          );
        })}
        {Object.keys(ADD_BUTTON_PAGES).includes(pathname) && (
          <SidebarItem
            key={pathname}
            isNavOpened={isNavOpened}
            title={`Добавить ${ADD_BUTTON_PAGES[pathname as keyof typeof ADD_BUTTON_PAGES]}`}
            path={
              pathname === '/exercises' ? '/exercises/add' : '/workouts/add'
            }
            icon={CirclePlus}
            className={styles.addButton}
          />
        )}
      </ul>
      <footer className={styles.lowerPart}>
        <Avatar />
        {isNavOpened && <h4 className={styles.username}>8BB User</h4>}
      </footer>
    </aside>
  );
};
