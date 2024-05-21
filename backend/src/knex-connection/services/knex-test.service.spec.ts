import { Test, TestingModule } from "@nestjs/testing";
import { KnexTestService } from "./knex-test.service";

describe("KnexTestService", () => {
  let service: KnexTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KnexTestService]
    }).compile();

    service = module.get<KnexTestService>(KnexTestService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
