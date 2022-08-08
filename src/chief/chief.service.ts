import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from "typeorm";
import { ChiefsEntity } from './entities/chief.entity';
import { CreateChiefDto } from './chief.dto';

@Injectable()
export class ChiefsService {
  constructor(
    @InjectRepository(ChiefsEntity)
    private chiefsRepository: Repository<ChiefsEntity>,
  ) {}

  findAll(): Promise<ChiefsEntity[]> {
    return this.chiefsRepository.find();
  }

  findOne(id: number): Promise<ChiefsEntity> {
    return this.chiefsRepository.findOneBy({ id });
  }

  create(createChiefDto: CreateChiefDto): Promise<InsertResult> {
    return this.chiefsRepository.insert({
      firstName: createChiefDto.first_name,
      lastName: createChiefDto.last_name,
      email: createChiefDto.email,
      phone: createChiefDto.phone,
    });
  }

  async remove(id: string): Promise<void> {
    await this.chiefsRepository.delete(id);
  }
}
