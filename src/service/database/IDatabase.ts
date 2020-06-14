interface IDatabase {
  pop(): string | undefined;
  push(value: string): this;
}

export { IDatabase };
