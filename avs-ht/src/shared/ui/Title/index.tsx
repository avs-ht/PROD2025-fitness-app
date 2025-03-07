import { ComponentProps, ElementType } from 'react';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface TitleOwnProps<E extends ElementType = ElementType> {
  tag?: E;
  hidden?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}
type TitleProps<E extends ElementType> = ComponentProps<E> & TitleOwnProps<E>;

const DEFAULT_TITLE = 'h2';
export const Title = <E extends ElementType = typeof DEFAULT_TITLE>(
  props: TitleProps<E>
) => {
  const { children, tag, className, hidden, textAlign, style, ...other } =
    props;

  const Tag = tag || DEFAULT_TITLE;
  return (
    <Tag
      className={clsx(styles.title, className, hidden && 'visually-hidden')}
      style={{
        textAlign,
        ...style
      }}
      {...other}>
      {children}
    </Tag>
  );
};
