/* istanbul ignore file */
import { ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import '../PRIVACY.md';
import { ZPrivacyPage } from './privacy/privacy-page';

render(
  <ZWebAppLayout whoami='privacy' home='/' profileApp='roadblock'>
    <Route exact path='/' render={ZPrivacyPage} />
  </ZWebAppLayout>,
  document.getElementById('privacy.zthunworks')
);
