import { HttpException, HttpStatus } from '@nestjs/common';

export class ValueValidationException extends HttpException {
  public constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
