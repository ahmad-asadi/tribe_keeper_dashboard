import { Module } from '@nestjs/common';
import { ChiefsController } from './chief.controller';
import { ChiefsService } from './chief.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChiefsEntity } from './entities/chief.entity';

@Module({
  controllers: [ChiefsController],
  providers: [ChiefsService],
  imports: [TypeOrmModule.forFeature([ChiefsEntity])],
})
export class ChiefsModule {}
