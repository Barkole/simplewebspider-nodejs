export interface IHttpThrottlerConfig {
  readonly once: number;
  readonly max: number;
  readonly ttl: number;
}
