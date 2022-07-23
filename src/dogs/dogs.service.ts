import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  public sayHi(): string {
    return 'Gau Gau';
  }
}
