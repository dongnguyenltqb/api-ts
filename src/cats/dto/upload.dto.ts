import { ApiProperty } from '@nestjs/swagger';

export class UploadSingleFile {
  target: string;
  @ApiProperty({
    format: 'binary',
  })
  image: string;
  age: number;
}
