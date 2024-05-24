import { Body, Controller, Post } from "@nestjs/common";
import { ZodValidationPipe } from "@/pipes/zod-validation.pipe";
import { z } from "zod";
import { UsersService } from "../services/users.service";

const createUserBodySchema = z.object({
  name: z.string(),
  login: z.string().email(),
  pin: z.string()
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema);

@Controller("/users/create")
export class CreateUserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async handle(
    @Body(bodyValidationPipe) body: CreateUserBodySchema
  ): Promise<any> {
    const { name, login, pin } = body;

    return await this.usersService.createUser({ name, login, pin });
  }
}
