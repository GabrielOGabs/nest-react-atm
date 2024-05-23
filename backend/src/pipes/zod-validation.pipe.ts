import { PipeTransform, BadRequestException } from "@nestjs/common";
import { ZodError, ZodSchema } from "zod";
import { fromZodError } from "zod-validation-error";

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: T) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          statuscode: 400,
          message: "Validation Error",
          instance: this.getClassName(value),
          errors: fromZodError(error)
        });
      }
      throw new BadRequestException("Validation failed");
    }
  }

  private getClassName<T>(obj: T): string {
    return (obj.constructor as { new (): any }).name;
  }
}
