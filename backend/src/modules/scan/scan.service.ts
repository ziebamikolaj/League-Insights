import { Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";

@Injectable()
export class ScanService {
  constructor(private readonly dbService: DbService) {}

  async getScanAndAnalyze() {
    // TODO
    return;
  }
}
