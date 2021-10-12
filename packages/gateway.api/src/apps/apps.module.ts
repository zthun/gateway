import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/works.http';
import { ZVaultModule } from '@zthun/works.nest';
import { ZAppsService } from './apps.service';

@Module({
  providers: [ZAppsService, ZHttpService],
  imports: [ZVaultModule],
  exports: [ZAppsService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAppsModule {}
