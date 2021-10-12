/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/works.http';
import { ZHealthModule, ZNestApplication, ZOptionsModule } from '@zthun/works.nest';
import { ZServiceToken } from './core/service-token';
import { ZProxyModule } from './proxy/proxy.module';
import { ZRoutesModule } from './routes/routes.module';
import { ZWebAppsModule } from './web-apps/web-apps.module';

@Module({
  imports: [ZWebAppsModule, ZRoutesModule, ZOptionsModule, ZHealthModule, ZProxyModule],
  providers: [
    {
      provide: ZServiceToken.HttpService,
      useClass: ZHttpService
    }
  ]
})
/**
 * The main module.
 */
export class ZRoadblockMainModule {}

ZNestApplication.create(ZRoadblockMainModule).then((app) => ZNestApplication.run(app));
