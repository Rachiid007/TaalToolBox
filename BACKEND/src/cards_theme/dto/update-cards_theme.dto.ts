import { PartialType } from '@nestjs/swagger';
import { CreateCardsThemeDto } from './create-cards_theme.dto';

export class UpdateCardsThemeDto extends PartialType(CreateCardsThemeDto) {}
