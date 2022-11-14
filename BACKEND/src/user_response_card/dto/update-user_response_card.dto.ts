import { PartialType } from '@nestjs/swagger';
import { CreateUserResponseCardDto } from './create-user_response_card.dto';

export class UpdateUserResponseCardDto extends PartialType(CreateUserResponseCardDto) {}
