import { IDatabase } from "../database";
export interface IBootstrapper {
  run(database: IDatabase): Promise<void>;
}
