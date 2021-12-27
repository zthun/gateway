import InfoIcon from '@mui/icons-material/Info';
import { ZMarkdownPage } from '@zthun/works.react';
import React from 'react';

export const ZPrivacySource = 'legal/PRIVACY.md';

/**
 * Represents the main terms page application.
 *
 * @returns The jsx for rendering the terms page.
 */
export function ZPrivacyPage() {
  return <ZMarkdownPage src={ZPrivacySource} headerText='Terms' subHeaderText='Usage agreement' avatar={<InfoIcon fontSize='large' />} size='xl' />;
}
