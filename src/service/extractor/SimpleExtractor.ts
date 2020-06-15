import { IExtractor } from "./IExtractor";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class SimpleExctractor implements IExtractor {
  async extract(url: string): Promise<string[]> {
    // TODO Implement this
    await sleep(1000);
    return [url];
  }
}
