import { Link, LinkProps } from '@tanstack/react-router';
import { Undo2 } from 'lucide-react';

import { Button } from '../Button';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

type BackButtonProps = LinkProps & { buttonClassName?: string };
export const BackButton = ({
  buttonClassName,
  ...linkProps
}: BackButtonProps) => {
  return (
    <Button link className={clsx(styles.button, buttonClassName)}>
      <Link {...linkProps}>
        <Undo2 /> Назад
      </Link>
    </Button>
  );
};
