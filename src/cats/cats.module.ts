import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { DogsService } from 'src/dogs/dogs.service';
import { Authentication } from 'src/common/auth.middleware';

@Module({
  controllers: [CatsController],
  providers: [CatsService, DogsService],
  exports: [CatsService, DogsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Authentication)
      .forRoutes({ path: '/cats/:id', method: RequestMethod.ALL });
  }
}
