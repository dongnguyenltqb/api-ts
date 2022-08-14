import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  ParseIntPipe,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';
import { pipeline } from 'stream';
const pump = util.promisify(pipeline);

import { ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ApiListBaseResponse,
  ApiSingleBaseResponse,
  extractMultipartFields,
  SingleBase,
} from 'src/common/api.dto';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { UploadSingleFile } from './dto/upload.dto';
import { Cat } from './entities/cat.entity';
import { FastifyRequest } from 'fastify';

@Controller('/cats')
@ApiTags('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiSingleBaseResponse(Cat)
  async create(@Body() createCatDto: CreateCatDto) {
    const entity = this.catsService.create(createCatDto);
    return new SingleBase<Cat>(entity);
  }

  @Get('/')
  @ApiListBaseResponse(Cat)
  findAll() {
    return 'this api return all cat';
  }

  @Get('/:id')
  @ApiSingleBaseResponse(Cat)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }

  @Post('/upload')
  @ApiConsumes('multipart/form-data')
  @ApiSingleBaseResponse(Cat)
  @HttpCode(HttpStatus.OK)
  async uploadFileAndPassValidation(
    @Req() req: FastifyRequest,
    @Body() body: UploadSingleFile,
  ) {
    const file = await req.file();
    await pump(
      file.file,
      fs.createWriteStream(path.join(process.cwd(), file.filename)),
    );
    body = extractMultipartFields<UploadSingleFile>(file.fields);
    return new SingleBase<Cat>(
      new Cat({
        age: body.age,
      }),
    );
  }

  @ApiOkResponse({ type: Cat })
  entity() {
    return null;
  }
}
