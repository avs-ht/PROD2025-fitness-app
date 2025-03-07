import { Link, useLocation } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { ADD_BUTTON_PAGES, NAV_ITEMS } from '../../constants';
import { Avatar } from '../Sidebar/Avatar';

import { useWindowSize } from '$/shared/lib/hooks/useWindowSize';
import { SlideNavigation } from './SlideNavigation';
import styles from './index.module.scss';

const CHANGE_LOGIC_NAV_BREAKPOINT = 520;
export const Footer = () => {
  const { width } = useWindowSize();
  const { pathname } = useLocation();

  const isChangeLogicBreakpoint = width < CHANGE_LOGIC_NAV_BREAKPOINT;

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.avatar}>
          <Avatar />
        </div>

        <nav className={styles.nav}>
          {!isChangeLogicBreakpoint ? (
            <>
              {Object.keys(ADD_BUTTON_PAGES).includes(pathname) && (
                <div className={styles.addButton}>
                  <Link
                    to={
                      pathname === '/exercises'
                        ? '/exercises/add'
                        : '/workouts/add'
                    }>
                    <span className={styles.addButtonContent}>
                      <span>
                        Добавить{' '}
                        {
                          ADD_BUTTON_PAGES[
                            pathname as keyof typeof ADD_BUTTON_PAGES
                          ]
                        }
                      </span>
                      <PlusCircleIcon size={32} />
                    </span>
                  </Link>
                </div>
              )}
              <ul className={styles.list}>
                {NAV_ITEMS.map(item => {
                  const { title, icon: Icon, path } = item;
                  return (
                    <li
                      key={path}
                      className={styles.item}
                      data-active={pathname === path}>
                      <div className={styles.icon}>
                        <Icon size={24} />
                      </div>
                      <h4 className={styles.title}>{title}</h4>
                      <Link to={path} className={styles.link}>
                        {title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <SlideNavigation />
          )}
        </nav>
      </footer>
    </>
  );
};
