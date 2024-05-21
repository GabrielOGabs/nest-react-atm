import { Controller, Get } from "@nestjs/common";
import { KnexTestService } from "../services/knex-test.service";

@Controller("knex")
export class KnexController {
  constructor(private readonly knexTest: KnexTestService) {}

  @Get("alive")
  public async getKnexAlive(): Promise<any> {
    return await this.knexTest.testConnection();
  }
}
