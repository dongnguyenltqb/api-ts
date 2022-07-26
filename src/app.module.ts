import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsModule } from './cats/cats.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CatsModule, CommonModule],
  controllers: [AppController],
})
export class AppModule {}
