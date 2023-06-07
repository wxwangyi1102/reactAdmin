import { openAuth, backFetchQuery } from 'oauth-teams-ts/lib';
import { get, post } from './utils/http';
const { version } = require('../package.json');

const sdkConfig = {
  serverUrl: 'https://passport.osisbim.com',
  clientId: '390c24fdbbc52b47dae6',
  appName: 'Teams',
  organizationName: 'OSIS-Teams',
  redirectPath: '/',
};
const wxworkLogin = (params) => {
  return get(`/api/wxwork/login?${JSON.stringify(params)}`);
};
function uniteLogin(params) {
  return post('/api/admin/user/auth/login', params);
}
const onGetLoginParams = ({ code, state, appname }) => {
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

const { wxworkParams, uniteParams } = onGetLoginParams(backFetchQuery(window.location.href));
openAuth(
  sdkConfig,
  () => wxworkLogin(wxworkParams),
  () => uniteLogin(uniteParams),
  (result, msg) => console.log(result, msg),
);
