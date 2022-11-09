import { PartialType } from '@nestjs/swagger';
import { CreateProficiencyDto } from './create-proficiency.dto';

export class UpdateProficiencyDto extends PartialType(CreateProficiencyDto) {}
