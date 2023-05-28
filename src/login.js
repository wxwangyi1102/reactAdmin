import { openAuth, backFetchQuery } from 'oauth-teams-ts/lib';
import { sdkConfig, wxworkLogin, uniteLogin, onGetLoginParams } from './pages/login/config';
const { wxworkParams, uniteParams } = onGetLoginParams(backFetchQuery(window.location.href));
openAuth(
  sdkConfig,
  () => wxworkLogin(wxworkParams),
  () => uniteLogin(uniteParams),
  (result, msg) => console.log(result, msg),
);
