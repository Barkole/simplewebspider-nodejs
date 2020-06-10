export interface IRequestThrottlerConfig {
  readonly concurrent: number;
  readonly perMinute: number;
}
