/* eslint-disable require-jsdoc */
import { render, waitFor } from '@testing-library/react';
import { ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { ZHttpServiceContext } from '@zthun/works.react';
import React from 'react';
import { ZPrivacyPage, ZPrivacySource } from './privacy-page';

describe('ZPrivacyPage', () => {
  let markdown: string;
  let http: ZHttpServiceMock;

  async function createTestTarget() {
    const target = render(
      <ZHttpServiceContext.Provider value={http}>
        <ZPrivacyPage />
      </ZHttpServiceContext.Provider>
    );

    await waitFor(() => expect(target.container.querySelector('.ZMarkdownPage-root')).toBeTruthy());
    return target;
  }

  beforeEach(() => {
    markdown = 'Privacy Policy';

    http = new ZHttpServiceMock();
    http.set(ZPrivacySource, ZHttpMethod.Get, new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).data(markdown).build());
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
