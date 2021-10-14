/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ZHealthModule, ZNestApplication, ZOptionsModule } from '@zthun/works.nest';
import { ZProxyModule } from './proxy/proxy.module';
import { ZRoutesModule } from './routes/routes.module';
import { ZWebAppsModule } from './web-apps/web-apps.module';

@Module({
  imports: [ZWebAppsModule, ZRoutesModule, ZOptionsModule, ZHealthModule, ZProxyModule]
})
/**
 * The main module.
 */
export class ZGatewayMainModule {}

ZNestApplication.create(ZGatewayMainModule).then((app) => ZNestApplication.run(app));
