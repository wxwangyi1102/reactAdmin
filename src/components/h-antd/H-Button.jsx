import { Button } from 'antd';

export default function HButton(props) {
  const { children, ...obj } = props;
  // 外观类型
  let btnStyle;
  switch (obj?.type) {
    case 'default':
      btnStyle = {
        padding: '4px 16px',
        borderColor: 'rgba(0,0,0,0.35)',
      };
      break;

    default:
      btnStyle = {
        padding: '4px 16px',
      };
      break;
  }

  return (
    <Button style={btnStyle} type="primary" ghost {...obj}>
      {children || '按钮'}
    </Button>
  );
}
