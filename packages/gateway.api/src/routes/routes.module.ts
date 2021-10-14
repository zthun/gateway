import { Module } from '@nestjs/common';
import { ZAppsModule } from '../apps/apps.module';
import { ZRoutesController } from './routes.controller';

@Module({
  imports: [ZAppsModule],
  controllers: [ZRoutesController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZRoutesModule {}
