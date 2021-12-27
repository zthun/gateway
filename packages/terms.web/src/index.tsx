/* istanbul ignore file */
import { ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import '../TERMS.md';
import { ZTermsPage } from './terms/terms-page';

render(
  <ZWebAppLayout whoami='terms' home='/' profileApp='roadblock'>
    <Route exact path='/' render={ZTermsPage} />
  </ZWebAppLayout>,
  document.getElementById('terms.zthunworks')
);
