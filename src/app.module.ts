import AdminJS from 'adminjs';

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChiefsModule } from './chief/chief.module';
import { LoggerMiddleware } from './chief/middlewares/logger.middleware';
import { DataSource } from 'typeorm';
import { ChiefsEntity } from './chief/entities/chief.entity';

AdminJS.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tribekeeper',
      password: 'tribe_KEEPER',
      database: 'tribekeeper',
      entities: [ChiefsEntity],
      synchronize: true,
    }),
    AdminModule.createAdmin({
      adminJsOptions: {
        rootPath: '/dashboard',
        resources: [],
      },
    }),
    ChiefsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('chiefs');
  }
}
