/* eslint-disable require-jsdoc */
import { render } from '@testing-library/react';
import React from 'react';
import { ZGatewayApp } from './app';

describe('ZGatewayApp', () => {
  it('renders the application', () => {
    // Arrange
    const target = render(<ZGatewayApp />);
    // Act
    const actual = target.container.querySelector('.ZGateway-root');
    // Assert
    expect(actual).toBeTruthy();
  });
});
