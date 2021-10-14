import { Controller, Get } from '@nestjs/common';
import { ZAppsService } from '../apps/apps.service';
import { IZRouteOption } from '../core/route-option';

@Controller('routes')
/**
 * A controller that enables the available web apps for the domain.
 */
export class ZRoutesController {
  /**
   * Initializes a new instance of this object.
   *
   * @param _apps The service used to retrieve all apps.
   */
  public constructor(private readonly _apps: ZAppsService) {}

  /**
   * Gets the list of all web apps available.
   *
   * @returns A promise that resolves with all available web apps.
   */
  @Get()
  public list(): Promise<IZRouteOption[]> {
    return this._apps.listAllWebAppRoutes();
  }
}
