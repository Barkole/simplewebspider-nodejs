export interface IExtractor {
  extract(url: string): Promise<Set<string>>;
}
