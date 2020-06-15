export interface IQueue {
  add(func: (this: void) => Promise<void>): Promise<void>;
}
