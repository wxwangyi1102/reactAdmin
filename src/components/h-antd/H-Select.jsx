import { Select } from 'antd';
import styles from './select.module.scss';

export default function HSelect(props) {
  const { options, defaultValue, onChange, ...obj } = props;
  // 外观类型
  let selectStyle = {
    width: '100%',
    borderRadius: '4px',
    opacity: 1,
    border: '1px solid rgba(0,0,0,0.2)',
  };
  return (
    <div className={styles.container} >
      <Select
        className={styles.select}
        style={selectStyle}
        defaultValue={defaultValue || undefined}
        onChange={onChange}
        options={options}
        {...obj}
      />
    </div>
  );
}
