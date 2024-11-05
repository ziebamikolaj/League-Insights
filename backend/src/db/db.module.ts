import { DynamicModule, Module } from "@nestjs/common";

import { DbService } from "./db.service";

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(): DynamicModule {
    return {
      module: DbModule,
      global: true,
      providers: [DbService],
      exports: [DbService],
    };
  }
}
