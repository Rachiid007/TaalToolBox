import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}
  async onApplicationBootstrap() {
    const role = await this.roleRepository.find();
    if (!role.length) {
      return this.roleRepository.save([
        {
          name: 'Administrateur',
          description: 'Rôle Administrateur',
        },
        {
          name: 'Créateur',
          description: 'Rôle Créateur',
        },
        {
          name: 'Professeur',
          description: 'Rôle Professeur',
        },
        {
          name: 'Elève',
          description: 'Rôle Elève',
        },
      ]);
    }
  }

  create(createRoleDto: CreateRoleDto) {
    this.roleRepository.save(createRoleDto);
  }

  async findAll() {
    const role = await this.roleRepository.createQueryBuilder('role').getMany();
    return role;
    // return `This action returns all role`;
  }
  public async findRole(role: string) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .where({ name: role })
      .getOne();
  }
  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    this.roleRepository.delete(id);
  }
}
