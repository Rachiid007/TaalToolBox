import { Injectable } from '@nestjs/common';
import { CreateWeightCardDto } from './dto/create-weight_card.dto';
import { UpdateWeightCardDto } from './dto/update-weight_card.dto';

@Injectable()
export class WeightCardService {
  create(createWeightCardDto: CreateWeightCardDto) {
    return 'This action adds a new weightCard';
  }

  findAll() {
    //Return an exemple of object for now
    return [
      { idUser: 1, idCard: 1, weightCard: 3 },
      { idUser: 1, idCard: 2, weightCard: 3 },
      { idUser: 1, idCard: 3, weightCard: 3 },
      { idUser: 1, idCard: 4, weightCard: 3 },
    ];
  }

  findOne(id: number) {
    return `This action returns a #${id} weightCard`;
  }

  update(id: number, updateWeightCardDto: UpdateWeightCardDto) {
    return `This action updates a #${id} weightCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} weightCard`;
  }
}
