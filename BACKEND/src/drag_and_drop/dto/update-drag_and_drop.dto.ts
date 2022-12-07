import { PartialType } from '@nestjs/mapped-types';
import { CreateDragDto } from './create-drag_and_drop.dto';
import { IsString } from 'class-validator';
export class UpdateDragDto extends PartialType(CreateDragDto) {
  @IsString()
  readonly image: string;
}
