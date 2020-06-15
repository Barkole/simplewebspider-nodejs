interface IDatabase {
  remove(): Promise<string | undefined>;
  add(...items: string[]): Promise<this>;
}

export { IDatabase };
