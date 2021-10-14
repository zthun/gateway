import { Module } from '@nestjs/common';
import { ZAppsModule } from '../apps/apps.module';
import { ZProxyController } from './proxy.controller';

@Module({
  imports: [ZAppsModule],
  controllers: [ZProxyController]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZProxyModule {}
