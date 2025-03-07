import { clsx } from '../../lib';

import styles from './index.module.scss';

interface PageProps {
  children: React.ReactNode;
  className?: string;
  contentCentering?: boolean;
  padding?: {
    block?: number;
    inline?: number;
  };
}
export const Page = ({
  children,
  className = '',
  contentCentering = true
}: PageProps) => {
  return (
    <div
      className={clsx(
        styles.page,
        contentCentering && styles.contentCentering,
        className
      )}>
      {children}
    </div>
  );
};
