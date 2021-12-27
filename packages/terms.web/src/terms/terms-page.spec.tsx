/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZHttpServiceContext } from '@zthun/works.react';
import React from 'react';
import { ZTermsPage, ZTermsSource } from './terms-page';

describe('ZTermsPage', () => {
  let markdown: string;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <ZTermsPage />
      </ZHttpServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZMarkdownPage-root')).toBeTruthy());
    return target;
  }

  beforeEach(() => {
    markdown = 'Terms of Use';

    http = new ZHttpServiceMock();
    http.set(ZTermsSource, ZHttpMethod.Get, new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).data(markdown).build());
  });

  it('should render the markdown.', async () => {
    // Arrange
    const target = await createTestTarget();
    // Act
    const actual = target.container.querySelector('.ZMarkdownViewer-markdown').textContent;
    // Assert
    expect(actual).toEqual(markdown);
  });
});
