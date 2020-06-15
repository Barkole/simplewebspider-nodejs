export interface IExtractor {
  extract(url: string): Promise<string[]>;
}
