import { IExtractor } from "./IExtractor";
import { randomInt } from "../../core/utils";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class SimpleExctractor implements IExtractor {
  async extract(url: string): Promise<string[]> {
    // TODO Implement this
    await sleep(randomInt(1000, 10000));
    return [url];
  }
}
