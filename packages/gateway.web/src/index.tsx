import { ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import './index.less';
import { ZGatewayWebAppsPage } from './web-apps/web-apps-page';

render(
  <ZWebAppLayout headerText='Zthunworks Gateway' whoami='gateway' home='/web-apps' profileApp='roadblock'>
    <Route exact path='/web-apps' component={ZGatewayWebAppsPage} />
  </ZWebAppLayout>,
  document.getElementById('gateway.zthunworks')
);
