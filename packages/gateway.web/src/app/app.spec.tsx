/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZGatewayApp } from './app';

describe('ZGatewayApp', () => {
  async function createTestTarget() {
    const target = render(<ZGatewayApp />);
    await waitFor(() => expect(target.container.querySelector('.ZGateway-root')).toBeTruthy());
    return target;
  }

  it('renders the application', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZGateway-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
