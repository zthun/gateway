import { Module } from '@nestjs/common';
import { ZAppsModule } from '../apps/apps.module';
import { ZWebAppsController } from '../web-apps/web-apps.controller';

@Module({
  imports: [ZAppsModule],
  controllers: [ZWebAppsController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZWebAppsModule {}
