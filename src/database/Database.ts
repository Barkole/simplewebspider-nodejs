interface Database {
  pop(): string | undefined;
  push(value: string): this;
}
