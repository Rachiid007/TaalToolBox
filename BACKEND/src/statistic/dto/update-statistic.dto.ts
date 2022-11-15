import { PartialType } from '@nestjs/swagger';
import { CreateStatisticDto } from './create-statistic.dto';

export class UpdateStatisticDto extends PartialType(CreateStatisticDto) {}
