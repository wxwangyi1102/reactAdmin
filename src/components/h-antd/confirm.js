import { Modal } from 'antd';
const { confirm } = Modal;
export default function showConfirm({ title, content }, callBack, cancelCallBack) {
  // icon: <ExclamationCircleFilled />,
  return confirm({
    title: title || 'Do you Want to delete these items?',
    content: content || 'Some descriptions',
    okText: '确定',
    // okType: 'danger',
    cancelText: '取消',
    onOk() {
      callBack();
    },
    onCancel() {
      cancelCallBack();
    },
  });
}
