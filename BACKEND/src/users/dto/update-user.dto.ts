import { PartialType } from '@nestjs/swagger';
import { CreateUsersDto } from './create-user.dto';

export class UpdateUsersDto extends PartialType(CreateUsersDto) {}
