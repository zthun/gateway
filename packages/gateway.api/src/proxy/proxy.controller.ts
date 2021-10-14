import { Controller, Delete, Get, Head, Options, Patch, Post, Put } from '@nestjs/common';

@Controller('*')
export class ZProxyController {
  public constructor() {}

  @Get()
  @Put()
  @Post()
  @Delete()
  @Patch()
  @Head()
  @Options()
  public forward() {
    return Promise.resolve(true);
  }
}
