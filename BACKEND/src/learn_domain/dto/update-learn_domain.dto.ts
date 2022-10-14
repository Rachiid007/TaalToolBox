import { PartialType } from '@nestjs/mapped-types';
import { CreateLearnDomainDto } from './create-learn_domain.dto';

export class UpdateLearnDomainDto extends PartialType(CreateLearnDomainDto) {}
