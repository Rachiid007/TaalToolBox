import { PartialType } from '@nestjs/mapped-types';
import { CreateWeightCardDto } from './create-weight_card.dto';

export class UpdateWeightCardDto extends PartialType(CreateWeightCardDto) {}
