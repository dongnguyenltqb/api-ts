import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  public whoami(): string {
    return 'this is common service';
  }
}
