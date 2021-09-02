/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZGatewayHomePage } from './home-page';

describe('ZGatewayHomePage', () => {
  function createTestTarget() {
    return render(<ZGatewayHomePage />);
  }

  it('renders the page', () => {
    // Arrange
    const target = createTestTarget();
    // Act
    const actual = target.queryByTestId('ZGatewayHomePage-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
