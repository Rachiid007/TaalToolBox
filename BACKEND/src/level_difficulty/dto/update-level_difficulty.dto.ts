import { PartialType } from '@nestjs/swagger';
import { CreateLevelDifficultyDto } from './create-level_difficulty.dto';

export class UpdateLevelDifficultyDto extends PartialType(CreateLevelDifficultyDto) {}
