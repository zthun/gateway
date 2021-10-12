import { ZHttpMethod } from '@zthun/works.http';

/**
 * Represents a potential api option path.
 */
export interface IZRouteOption {
  /**
   * The owner of the api route.
   */
  owner?: string;

  /**
   * The route path.
   */
  path: string;

  /**
   * The http method to access the route.
   */
  method: ZHttpMethod;
}

/**
 * Represents a builder for an api option.
 */
export class ZRouteOptionBuilder {
  private _option: IZRouteOption;

  public constructor() {
    this._option = {
      path: '',
      method: ZHttpMethod.Get
    };
  }

  public owner(id: string): this {
    this._option.owner = id;
    return this;
  }

  public path(path: string): this {
    this._option.path = path;
    return this;
  }

  public method(method: ZHttpMethod): this {
    this._option.method = method;
    return this;
  }

  public copy(other: IZRouteOption): this {
    this._option = JSON.parse(JSON.stringify(other));
    return this;
  }

  public build(): IZRouteOption {
    return JSON.parse(JSON.stringify(this._option));
  }
}
