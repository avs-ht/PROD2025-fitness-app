import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { ChevronFirst } from 'lucide-react';
import { useState } from 'react';

import { ADD_BUTTON_PAGES, NAV_ITEMS } from '../../constants';

import { Title } from '$/shared/ui';
import styles from './SlideNavigation.module.scss';

export const SlideNavigation = () => {
  const { pathname } = useLocation();
  const [indexOfItem, setIndexOfItem] = useState(
    Math.abs(NAV_ITEMS.findIndex(item => item.path === pathname))
  );
  const item = NAV_ITEMS[indexOfItem];
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={() =>
          setIndexOfItem(prev => {
            const newIndex = prev === 0 ? NAV_ITEMS.length - 1 : prev - 1;
            navigate({ to: NAV_ITEMS[newIndex].path });
            return newIndex;
          })
        }>
        <ChevronFirst />
      </button>
      <Title className={styles.title} tag='h4'>
        <Link to={item.path} className={styles.link}>
          <span className={styles.text}>
            <item.icon />
            {item.title}
          </span>
        </Link>
        {Object.keys(ADD_BUTTON_PAGES).includes(pathname) && (
          <Link
            to={
              pathname === '/exercises' ? '/exercises/add' : '/workouts/add'
            }>{`Добавить`}</Link>
        )}
      </Title>
      <button
        className={styles.button}
        onClick={() =>
          setIndexOfItem(prev => {
            const newIndex = (prev + 1) % NAV_ITEMS.length;
            navigate({ to: NAV_ITEMS[newIndex].path });
            return newIndex;
          })
        }>
        <ChevronFirst />
      </button>
    </div>
  );
};
