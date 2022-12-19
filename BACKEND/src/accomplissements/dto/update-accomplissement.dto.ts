import { PartialType } from '@nestjs/mapped-types';
import { CreateAccomplissementDto } from './create-accomplissement.dto';

export class UpdateAccomplissementDto extends PartialType(CreateAccomplissementDto) {}
