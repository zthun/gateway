/**
 * @jest-environment node
 */
import { ZHttpMethod } from '@zthun/works.http';
import { createMocked } from '@zthun/works.jest';
import { ZAppsService } from '../apps/apps.service';
import { IZRouteOption, ZRouteOptionBuilder } from '../core/route-option';
import { ZRoutesController } from './routes.controller';

describe('ZRoutesController', () => {
  let apps: jest.Mocked<ZAppsService>;
  let routeGet: IZRouteOption;
  let routePut: IZRouteOption;
  let routes: IZRouteOption[];

  function createTestTarget() {
    return new ZRoutesController(apps);
  }

  beforeEach(() => {
    routeGet = new ZRouteOptionBuilder().method(ZHttpMethod.Get).path('/api/health').build();
    routePut = new ZRouteOptionBuilder().method(ZHttpMethod.Put).path('/api/profiles').build();
    routes = [routeGet, routePut];

    apps = createMocked(['listAllWebAppRoutes']);
    apps.listAllWebAppRoutes.mockResolvedValue(routes);
  });

  describe('List', () => {
    it('should return the list of all available routes.', async () => {
      // Arrange
      const target = createTestTarget();
      // Act
      const actual = await target.list();
      // Assert
      expect(actual).toEqual(routes);
    });
  });
});
