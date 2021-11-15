/**
 * @jest-environment node
 */
/* eslint-disable require-jsdoc */
import { IZConfigEntry, IZRouteOption, IZWebApp, ZConfigEntryBuilder, ZRouteOptionBuilder } from '@zthun/works.core';
import { ZHttpCodeClient, ZHttpCodeSuccess, ZHttpMethod, ZHttpResultBuilder, ZHttpServiceMock } from '@zthun/works.http';
import { createMocked } from '@zthun/works.jest';
import { ZCommonConfigService } from '@zthun/works.nest';
import { ZAppsService } from './apps.service';

describe('ZAppsService', () => {
  let domain: IZConfigEntry;
  let config: jest.Mocked<ZCommonConfigService>;
  let http: ZHttpServiceMock;

  function createTestTarget() {
    return new ZAppsService(config, http);
  }

  beforeEach(() => {
    domain = new ZConfigEntryBuilder().scope('common').key('domain').value('zthunworks.com').build();

    config = createMocked<ZCommonConfigService>(['domain']);
    config.domain.mockResolvedValue(domain);

    http = new ZHttpServiceMock();
  });

  describe('Web Applications', () => {
    it('should return all applications.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.listWebApps();
      // Assert
      expect(actual).toBeTruthy();
    });

    async function assertReturnsApplication(expected: string, appFn: (t: ZAppsService) => Promise<IZWebApp>) {
      // Arrange
      const target = createTestTarget();
      // Act
      const app = await appFn(target);
      const actual = app._id;
      // Assert
      expect(actual).toEqual(expected);
    }

    it('should return the gateway application.', async () => {
      assertReturnsApplication(ZAppsService.IdGateway, (t) => t.createAppGateway());
    });

    it('should return the roadblock application.', async () => {
      assertReturnsApplication(ZAppsService.IdRoadblock, (t) => t.createAppRoadblock());
    });

    it('should return the legal application.', async () => {
      assertReturnsApplication(ZAppsService.IdLegal, (t) => t.createAppLegal());
    });

    it('should return the support application.', async () => {
      assertReturnsApplication(ZAppsService.IdSupport, (t) => t.createAppSupport());
    });

    it('should return all routes from each app service.', async () => {
      // Arrange.
      const options = (app: IZWebApp) => new ZRouteOptionBuilder().method(ZHttpMethod.Get).path(`api/options`).owner(app._id).build();
      const health = (app: IZWebApp) => new ZRouteOptionBuilder().method(ZHttpMethod.Get).path(`api/health`).owner(app._id).build();

      const target = createTestTarget();
      const apps = await target.listWebApps();
      const intranetRoutes = await Promise.all(apps.map((app) => target.createAppIntranetRoute(app)));
      const expected = [];

      apps.forEach((app, i) => {
        const routeOptions = options(app);
        const routeHealth = health(app);
        expected.push(routeOptions);
        expected.push(routeHealth);
        const result = new ZHttpResultBuilder().status(ZHttpCodeSuccess.OK).data([routeOptions, routeHealth]).build();
        http.set<IZRouteOption[]>(intranetRoutes[i], ZHttpMethod.Get, result);
      });

      // Act.
      const actual = await target.listAllWebAppRoutes();
      // Assert.
      expect(actual).toEqual(expected);
    });

    it('should skip routes that fail to respond to the options call.', async () => {
      // Arrange.
      const target = createTestTarget();
      const apps = await target.listWebApps();
      const intranetRoutes = await Promise.all(apps.map((app) => target.createAppIntranetRoute(app)));
      const result = new ZHttpResultBuilder().data('Failed').status(ZHttpCodeClient.NotFound).build();
      intranetRoutes.forEach((route) => http.set(route, ZHttpMethod.Get, result));
      // Act.
      const actual = await target.listAllWebAppRoutes();
      // Assert.
      expect(actual).toEqual([]);
    });
  });
});
