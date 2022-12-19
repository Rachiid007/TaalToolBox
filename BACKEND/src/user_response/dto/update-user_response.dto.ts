import { PartialType } from '@nestjs/swagger';
import { CreateUserResponseDto } from './create-user_response.dto';

export class UpdateUserResponseDto extends PartialType(CreateUserResponseDto) {}
