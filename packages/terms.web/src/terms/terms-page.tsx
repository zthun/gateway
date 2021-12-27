import MouseIcon from '@mui/icons-material/Mouse';
import { ZMarkdownPage } from '@zthun/works.react';
import React from 'react';

export const ZTermsSource = 'legal/TERMS.md';

/**
 * Represents the main terms page application.
 *
 * @returns The jsx for rendering the terms page.
 */
export function ZTermsPage() {
  return <ZMarkdownPage src={ZTermsSource} headerText='Terms' subHeaderText='Usage agreement' avatar={<MouseIcon fontSize='large' />} size='xl' />;
}
