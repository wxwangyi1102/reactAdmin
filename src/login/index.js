import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { openAuth, backFetchQuery } from 'oauth-teams-ts/lib';
import { sdkConfig, onGetLoginParams, wxworkLogin, uniteLogin } from './config';
const { wxworkParams, uniteParams } = onGetLoginParams(backFetchQuery(window.location.href));

export default function Login() {
  // loading
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  // 登陆
  // openAuth(
  //   sdkConfig,
  //   () => wxworkLogin(wxworkParams),
  //   () => uniteLogin(uniteParams),
  //   (e) => {
  //     console.log(e, 'e');
  //   },
  // );
  return <Spin indicator={antIcon} />;
}
