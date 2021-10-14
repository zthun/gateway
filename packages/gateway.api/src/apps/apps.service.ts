import { Inject, Injectable } from '@nestjs/common';
import { IZWebApp, ZWebAppBuilder } from '@zthun/works.core';
import { IZHttpService, ZHttpRequestBuilder } from '@zthun/works.http';
import { ZCommonConfigService } from '@zthun/works.nest';
import { ZUrlBuilder } from '@zthun/works.url';
import { IZRouteOption, ZRouteOptionBuilder } from '../core/route-option';
import { ZServiceToken } from '../core/service-token';

@Injectable()
/**
 * Represents a service that manages profiles and users.
 */
export class ZAppsService {
  public static IdGateway = 'gateway';
  public static IdRoadblock = 'roadblock';
  public static IdLegal = 'legal';
  public static IdSupport = 'support';

  // cspell:disable
  public static IconSupport = '<svg focusable="false" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
  public static IconLegal = '<svg focusable="false" viewBox="0 0 24 24"><path d="M13 1.07V9h7c0-4.08-3.05-7.44-7-7.93zM4 15c0 4.42 3.58 8 8 8s8-3.58 8-8v-4H4v4zm7-13.93C7.05 1.56 4 4.92 4 9h7V1.07z"></path></svg>';
  // cspell:enable

  /**
   * Initializes a new instance of this object.
   *
   * @param _vault The service used to retrieve the domain configuration.
   */
  public constructor(private _common: ZCommonConfigService, @Inject(ZServiceToken.HttpService) private _http: IZHttpService) {}

  /**
   * Creates an ico file from an svg stream.
   *
   * @param svg The raw string of the icon.
   *
   * @returns The raw buffer as a base64 encoded data url.
   */
  private _createIcon(svg: string) {
    const raw = Buffer.from(svg, 'ascii');
    const base64 = raw.toString('base64');
    return `data:image/svg+xml;base64,${base64}`;
  }

  private async _getDomain(domain?: string) {
    if (domain) {
      return domain;
    }

    const config = await this._common.domain();
    domain = new ZUrlBuilder().protocol('https').hostname(config.value).build();
    return domain;
  }

  /**
   * Creates the metadata for the Gateway application.
   *
   * @param domain The root domain that the application lives on.
   */
  public async createAppGateway(domain?: string) {
    domain = await this._getDomain(domain);
    const gatewayUrl = new ZUrlBuilder().parse(domain).subdomain('gateway').build();
    const github = 'https://github.com/zthun/gateway';
    return new ZWebAppBuilder().id(ZAppsService.IdGateway).name('Gateway').domain(gatewayUrl).source(github).build();
  }

  /**
   * Creates the metadata for the Roadblock application.
   *
   * @param domain The root domain that the application lives on.
   */
  public async createAppRoadblock(domain?: string) {
    domain = await this._getDomain(domain);
    const url = new ZUrlBuilder().parse(domain).subdomain('roadblock').build();
    const github = 'https://github.com/zthun/roadblock';
    return new ZWebAppBuilder().id(ZAppsService.IdRoadblock).name('Roadblock').domain(url).source(github).build();
  }

  /**
   * Creates the metadata for the Legal application.
   *
   * @param domain The root domain that the application lives on.
   */
  public async createAppLegal(domain?: string) {
    domain = await this._getDomain(domain);
    const icon = this._createIcon(ZAppsService.IconLegal);
    const url = new ZUrlBuilder().parse(domain).subdomain('legal').build();
    const github = 'https://github.com/zthun/legal';
    return new ZWebAppBuilder().id(ZAppsService.IdLegal).name('Legal').domain(url).icon(icon).source(github).build();
  }

  /**
   * Creates the metadata for the Support application.
   *
   * @param domain The root domain that the application lives on.
   */
  public async createAppSupport(domain?: string) {
    domain = await this._getDomain(domain);
    const icon = this._createIcon(ZAppsService.IconSupport);
    const url = new ZUrlBuilder().parse(domain).subdomain('support').build();
    const github = 'https://github.com/zthun/support';
    return new ZWebAppBuilder().id(ZAppsService.IdSupport).name('Support').domain(url).icon(icon).source(github).build();
  }

  /**
   * Generates a list of all the apps available.
   *
   * @returns A promise of all the available apps.
   */
  public async listWebApps(): Promise<IZWebApp[]> {
    const domain = await this._getDomain();
    return Promise.all([this.createAppGateway(domain), this.createAppRoadblock(domain), this.createAppLegal(domain), this.createAppSupport(domain)]);
  }

  public async listAllWebAppRoutes(): Promise<IZRouteOption[]> {
    const apps = await this.listWebApps();

    const results = apps.map((app) => this.readWebAppRoutes(app));
    const every = await Promise.all(results);

    let options = [];

    every.forEach((set) => {
      options = options.concat(set);
    });

    return options;
  }

  public async createAppIntranetRoute(app: IZWebApp): Promise<string> {
    // Remember that these services are not exposed and instead are accessed through the docker intranet
    // address which will be the app id followed by -services-api and they are expected to run on port 3000.
    const intranetName = `${app._id}-services-api`;
    return Promise.resolve(new ZUrlBuilder().protocol('http').hostname(intranetName).port(3000).append('/api/options').build());
  }

  public async readWebAppRoutes(app: IZWebApp): Promise<IZRouteOption[]> {
    try {
      const url = await this.createAppIntranetRoute(app);
      const request = new ZHttpRequestBuilder().url(url).get().build();
      const response = await this._http.request<IZRouteOption[]>(request);
      const options = response.data;
      return options.map((option) => new ZRouteOptionBuilder().copy(option).owner(app._id).build());
    } catch (err) {
      return [];
    }
  }
}
