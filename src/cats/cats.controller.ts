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
} from '@nestjs/common';

import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiSingleBaseResponse, SingleBase } from 'src/common/api.dto';
import { HttpExceptionFilter } from 'src/http-exception.filter';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

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
  findAll() {
    return 'this api return all cat';
  }

  @Get('/:id')
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

  @ApiOkResponse({ type: Cat })
  entity() {
    // do this to fix bug swagger did not import entity
  }
}
