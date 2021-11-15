import { Controller, Delete, Get, Head, Options, Patch, Post, Put } from '@nestjs/common';

@Controller('*')
/**
 * Represents a proxy controller that forwards traffic to the respective api.
 */
export class ZProxyController {
  /**
   * Forwards the request to the wanted api route.
   *
   * @returns The result of the forwarded request.
   */
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
