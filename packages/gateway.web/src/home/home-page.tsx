import { Grid } from '@material-ui/core';
import React from 'react';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZGatewayHomePage() {
  return (
    <Grid container spacing={3} className='ZGatewayHomePage-root' data-testid='ZGatewayHomePage-root'>
      <Grid item>Gateway</Grid>
    </Grid>
  );
}
