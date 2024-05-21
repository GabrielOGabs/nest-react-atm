import { Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nestjs-knex";

@Injectable()
export class KnexTestService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  public async testConnection() {
    const test = await this.knex.raw("Select 'IT WORKS' as query_result");
    return test;
  }
}
