import { Injectable } from "@nestjs/common";
import { db } from "./database";

@Injectable()
export class DbService {
  readonly #client: typeof db;

  constructor() {
    this.#client = db;
  }

  get client(): typeof db {
    return this.#client;
  }
}
