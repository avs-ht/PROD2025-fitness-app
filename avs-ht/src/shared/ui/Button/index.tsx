import { ComponentProps, ElementType } from 'react';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface ButtonOwnProps<E extends ElementType = ElementType> {
  children: React.ReactNode;
  tag?: E;
  link?: boolean;
  deleteButton?: boolean;
}

type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>;

const DEFAULT_TAG = 'button';
export const Button = <E extends ElementType = typeof DEFAULT_TAG>(
  props: ButtonProps<E>
) => {
  const {
    tag,
    children,
    className,
    link = false,
    deleteButton,
    ...other
  } = props;
  const Tag = tag || DEFAULT_TAG;

  return (
    <Tag
      className={clsx(styles.button, {
        [styles.link]: link,
        [styles.deleteButton]: deleteButton === true,
        [className]: className
      })}
      {...other}>
      {children}
    </Tag>
  );
};
