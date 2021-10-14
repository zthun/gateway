/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZGatewayWebAppsPage } from './web-apps-page';

describe('ZGatewayHomePage', () => {
  function createTestTarget() {
    return render(<ZGatewayWebAppsPage />);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZGatewayWebAppsPage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
