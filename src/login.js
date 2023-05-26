import { openAuth, backFetchQuery } from 'oauth-teams-ts/lib';
import { sdkConfig, wxworkLogin, uniteLogin, onGetLoginParams } from './pages/login/config';
const { wxworkParams, uniteParams } = onGetLoginParams(backFetchQuery(window.location.href));
const result = openAuth(
  sdkConfig,
  () => wxworkLogin(wxworkParams),
  () => uniteLogin(uniteParams),
  (e, text) => {
    console.log(e, text, 'e');
  },
);
console.log('123456798', result);
