import { Link, useLocation } from '@tanstack/react-router';

import { NAV_ITEMS } from '../../constants';

import { clsx } from '$/shared/lib';
import { Title } from '$/shared/ui';
import style from './SidebarItem.module.scss';

type SidebarItemProps = (typeof NAV_ITEMS)[number] & {
  isNavOpened: boolean;
  className?: string;
};
export const SidebarItem = (props: SidebarItemProps) => {
  const { pathname } = useLocation();
  const { title, path, icon: Icon, isNavOpened, className } = props;
  return (
    <li className={clsx(style.item, className)}>
      <Link
        to={path}
        className={clsx(style.link, pathname === path && style.active)}>
        <span className={style.icon}>
          <Icon size={32} />
        </span>
        {isNavOpened && <Title className={style.title}>{title}</Title>}
      </Link>
    </li>
  );
};
