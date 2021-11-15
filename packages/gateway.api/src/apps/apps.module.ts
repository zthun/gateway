import { Module } from '@nestjs/common';
import { ZHttpModule, ZVaultModule } from '@zthun/works.nest';
import { ZAppsService } from './apps.service';

@Module({
  providers: [ZAppsService],
  imports: [ZVaultModule, ZHttpModule],
  exports: [ZAppsService]
})
/**
 * Represents a module that includes all services regarding authentication.
 */
export class ZAppsModule {}
