import { IsNumber, IsString } from 'class-validator';
import { School } from '../../school/entities/school.entity';
export class CreateSchoolclassDto {
  //Entité obligatoire pour créer une classe
  @IsString()
  name: string;

  @IsNumber()
  schoolId: number;
}
