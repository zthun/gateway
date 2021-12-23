/* istanbul ignore file */
import MouseIcon from '@mui/icons-material/Mouse';
import { renderMarkdownPage, ZWebAppLayout } from '@zthun/works.react';
import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import '../TERMS.md';

const markdownTerms = 'legal/TERMS.md';
const renderTermsPage = renderMarkdownPage.bind(null, { src: markdownTerms, headerText: 'Terms', subHeaderText: 'Usage of this website', avatar: <MouseIcon fontSize='large' />, size: 'lg' });

render(
  <ZWebAppLayout whoami='terms' home='/' profileApp='roadblock'>
    <Route exact path='/' render={renderTermsPage} />
  </ZWebAppLayout>,
  document.getElementById('terms.zthunworks')
);
