import { Controller, Logger, Get, Post, Param, Body } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { CreateChiefDto, ListChiefDto } from './chief.dto';
import { ChiefsService } from './chief.service';
import { ChiefsEntity } from './entities/chief.entity';
import { InsertResult } from 'typeorm';

@Controller('chiefs')
export class ChiefsController {
  constructor(private chiefsService: ChiefsService) {}

  @Get('profiles')
  info(@Param('profileId') profileId: string): ListChiefDto[] {
    const result = [];
    Logger.log(profileId);

    this.chiefsService.findAll().then(
      (all_chiefs: ChiefsEntity[]) => {
        for (const chief of all_chiefs) {
          const listChiefDto = new ListChiefDto();
          listChiefDto.email = chief.email;
          listChiefDto.first_name = chief.firstName;
          listChiefDto.last_name = chief.lastName;
          listChiefDto.phone = chief.phone;
          result.push(listChiefDto);
        }
      },
      (error) => {
        Logger.error(error);
      },
    );

    return result;
  }

  @Post('register')
  register(@Body() createChiefDto: CreateChiefDto) {
    let result = null;
    this.chiefsService.create(createChiefDto).then((value: InsertResult) => {
      result = {
        raw: value.raw,
        identifiers: value.identifiers,
      };
    });

    return result;
  }
}
