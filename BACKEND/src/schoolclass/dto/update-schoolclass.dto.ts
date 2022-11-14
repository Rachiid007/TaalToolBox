import { PartialType } from '@nestjs/swagger';
import { CreateSchoolclassDto } from './create-schoolclass.dto';

export class UpdateSchoolclassDto extends PartialType(CreateSchoolclassDto) {}
