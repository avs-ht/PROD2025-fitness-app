import { Link } from '@tanstack/react-router';

import styles from './Avatar.module.scss';

export const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <span>8B</span>
      <Link to='/profile' className={styles.link} />
    </div>
  );
};
