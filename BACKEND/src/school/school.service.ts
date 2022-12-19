import { School } from '../school/entities/school.entity';
import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SchoolService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}
  async onApplicationBootstrap() {
    const school = await this.schoolRepository.find();
    if (!school.length) {
      return this.schoolRepository.save([
        {
          name: 'Institut Saint Joseph',
          address: 'Rue Félix Hap 14, 1040 Bruxelles',
        },
        {
          name: 'Institut Don Bosco',
          address: 'Av. du Val dOr 90, 1150 Woluwe-Saint-Pierre',
        },
        {
          name: 'Institut Cardinal Mercier',
          address: 'Bd Lambermont 35, 1030 Schaerbeek',
        },
      ]);
    }
  }
  create(createSchoolDto: CreateSchoolDto) {
    // return 'This action adds a new school';
    const school = this.schoolRepository.create(createSchoolDto);
    return this.schoolRepository.save(school);
  }

  findAll() {
    return this.schoolRepository.find();
  }

  // findOne(id: number) {
  //   return this.schoolRepository.findOne(id);
  // }

  public async findSchool(school: string) {
    return await this.schoolRepository
      .createQueryBuilder('school')
      .where({ name: school })
      .getOne();
  }

  update(id: number, updateSchoolDto: UpdateSchoolDto) {
    this.schoolRepository.update(id, updateSchoolDto);
  }

  remove(id: number) {
    this.schoolRepository.delete(id);
  }
}
