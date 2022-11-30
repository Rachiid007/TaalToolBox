import { PartialType } from '@nestjs/swagger';
import { CreateLevelMapDto } from './create-level_map.dto';

export class UpdateLevelMapDto extends PartialType(CreateLevelMapDto) {}
