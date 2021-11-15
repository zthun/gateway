import WebIcon from '@mui/icons-material/Web';
import { Grid, Typography } from '@mui/material';
import { IZWebApp } from '@zthun/works.core';
import { useWebAppsAndWatch, ZCircularBackdrop, ZPaperCard } from '@zthun/works.react';
import React from 'react';

/**
 * Renders the page that lists all the web apps, descriptions, and status.
 *
 * @returns The jsx that renders the web apps.
 */
export function ZGatewayWebAppsPage() {
  const webAppsData = useWebAppsAndWatch();
  const webApps = webAppsData.data;

  if (webApps === undefined) {
    return <ZCircularBackdrop />;
  }

  /**
   * Renders an individual web app.
   *
   * @param app The web app to render.
   *
   * @returns The jsx that can render the web app.
   */
  function renderWebApp(app: IZWebApp) {
    return (
      <Grid key={app._id} item={true} className={`ZGatewayWebAppsPage-app ZGatewayWebAppsPage-app-${app._id}`} xs={12} sm={6} md={4} lg={3} xl={2}>
        <ZPaperCard headerText={app.name} subHeaderText={app._id} imageUrl={app.icon} imageHeight='lg' size='auto' avatar={<WebIcon fontSize='large' />} actionText='Learn More...'>
          <Typography className='ZHomePage-summary-text'>APP DESCRIPTION</Typography>
        </ZPaperCard>
      </Grid>
    );
  }

  /**
   * Renders all web apps.
   *
   * @returns The jsx for all rendered web apps.
   */
  function renderWebApps() {
    const apps = webApps || [];
    return <>{apps.map((app) => renderWebApp(app))}</>;
  }

  return (
    <Grid container spacing={3} className='ZGatewayWebAppsPage-root'>
      {renderWebApps()}
    </Grid>
  );
}
