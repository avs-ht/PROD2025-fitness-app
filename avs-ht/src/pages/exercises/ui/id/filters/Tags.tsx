import { Title } from '$/shared/ui';
import styles from './Tags.module.scss';

const MAX_DISPLAYED_TAGS = 5;
interface TagsProps {
  tags: string[];
  title: string;
}
export const Tags = ({ tags, title }: TagsProps) => {
  if (!tags.length) return null;
  return (
    <div className={styles.tags}>
      <Title tag='h3' className={styles.title}>
        {title}
      </Title>
      <ul className={styles.tagsList}>
        {tags.slice(0, MAX_DISPLAYED_TAGS).map(tag => {
          return <li key={tag} className={styles.tag}>{`- ${tag}`}</li>;
        })}
        {tags.length > MAX_DISPLAYED_TAGS && (
          <li>
            <button className={styles.tagsMore}>
              - и ещё несколько штук ({tags.length - MAX_DISPLAYED_TAGS} шт.)
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
