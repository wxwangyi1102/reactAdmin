import styles from './index.module.scss';
export default function SpanBlock(props) {
  return props?.text && <span className={styles['span-style']}>{props.text}</span>;
}
