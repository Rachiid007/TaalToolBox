import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {
  Injectable,
  NotFoundException,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
@Injectable()
export class AnswerService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}
  async onApplicationBootstrap() {
    const answer = await this.answerRepository.find();

    if (!answer.length) {
      return this.answerRepository.save([
        {
          name: `J'ai trouvé`,
          description: 'Lutilisateur à trouvé la bonne réponse',
          weight: -1,
        },
        {
          name: 'Presque trouvé',
          description: 'Lélève à presque trouvé la bonne réponse',
          weight: 0,
        },
        {
          name: `Je n'ai pas trouvé`,
          description: 'Lélève na pas trouvé la bonne réponse',
          weight: 1,
        },
      ]);
    }
  }
  create(createAnswerDto: CreateAnswerDto) {
    const answer = this.answerRepository.create(createAnswerDto);
    return this.answerRepository.save(answer);
  }

  findAll() {
    return this.answerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} answer`;
  }
  /*
  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }
*/
  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
