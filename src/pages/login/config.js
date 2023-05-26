import { get, post } from '../../utils/http';
export const { version } = require('../../../package.json');

export const sdkConfig = {
  serverUrl: 'https://passport.osisbim.com',
  clientId: '390c24fdbbc52b47dae6',
  appName: 'Teams',
  organizationName: 'OSIS-Teams',
  redirectPath: '/',
};
export const wxworkLogin = (params) => {
  return get(`/api/wxwork/login?${JSON.stringify(params)}`);
};
export function uniteLogin(params) {
  return post('/api/admin/user/auth/login', params);
}
export const onGetLoginParams = ({ code, state, appname }) => {
  const wxworkParams = {
    code,
    Appid: 7,
    Platform: 'Web',
    Appname: 'Teams',
    State: state,
    Appversion: version,
    app_name: appname,
  };
  const uniteParams = {
    code,
    Appid: 7,
    Platform: 'Web',
    Appname: 'Teams',
    State: state,
    Appversion: version,
  };
  return { wxworkParams, uniteParams };
};
