import { Module } from '@nestjs/common';
import { ZHttpService } from '@zthun/works.http';
import { ZServiceToken } from './service-token';

const ZHttpProvider = { provide: ZServiceToken.HttpService, useClass: ZHttpService };

@Module({
  providers: [ZHttpProvider, ZHttpService],
  exports: [ZHttpProvider, ZHttpService]
})
export class ZHttpModule {}
