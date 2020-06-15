interface IDatabase {
  pop(): Promise<string | undefined>;
  push(...items: string[]): Promise<this>;
}

export { IDatabase };
