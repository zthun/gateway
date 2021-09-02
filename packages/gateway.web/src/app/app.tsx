import { useProfileRoot, useWebAppsRoot, ZAlertSnackbar, ZContent, ZTopNav } from '@zthun/works.react';
import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ZGatewayHomePage } from '../home/home-page';

/**
 * Represents the entry point of the client application.
 *
 * @returns The jsx that renders the entire application.
 */
export function ZGatewayApp() {
  useProfileRoot();
  useWebAppsRoot();

  return (
    <div className='ZGateway-root'>
      <HashRouter>
        <ZTopNav headerText='Gateway' whoami='gateway' profileApp='roadblock' />
        <ZContent>
          <Switch>
            <Route exact path='/home' component={ZGatewayHomePage} />
            <Redirect from='/' to='/home' />
          </Switch>
        </ZContent>
      </HashRouter>
      <ZAlertSnackbar />
    </div>
  );
}
