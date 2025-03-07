import { Link } from '@tanstack/react-router';

import { GUEST_BENEFITS, GUEST_BUTTONS } from '../../constants';

import { Button } from '$/shared/ui';
import { Title } from '$/shared/ui';
import styles from './GuestView.module.scss';

export const GuestView = () => (
  <>
    <Title tag='h1' className={styles.title}>
      <q>
        Байт крутой, потому что имеет 8 битов <br />
        Чем ты хуже?
      </q>
    </Title>
    <ul className={styles.benefits}>
      {GUEST_BENEFITS.map(({ emoji, title }) => (
        <li className={styles.benefit} key={title}>
          <span className={styles.emoji}>{emoji}</span>
          <Title tag='h2'>{title}</Title>
        </li>
      ))}
    </ul>
    <div className={styles.buttonsContainer}>
      {GUEST_BUTTONS.map(({ text, link }) => (
        <Button key={link} link>
          <Link to={link}>{text}</Link>
        </Button>
      ))}
    </div>
  </>
);
