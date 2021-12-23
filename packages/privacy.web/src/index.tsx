/* istanbul ignore file */
import InfoIcon from '@mui/icons-material/Info';
import { renderMarkdownPage, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import '../PRIVACY.md';

const markdownPrivacy = 'legal/PRIVACY.md';
const renderPrivacyPage = renderMarkdownPage.bind(null, { src: markdownPrivacy, headerText: 'Privacy', subHeaderText: 'Information collection', avatar: <InfoIcon fontSize='large' />, size: 'xl' });

render(
  <ZWebAppLayout whoami='privacy' home='/' profileApp='roadblock'>
    <Route exact path='/' render={renderPrivacyPage} />
  </ZWebAppLayout>,
  document.getElementById('privacy.zthunworks')
);
