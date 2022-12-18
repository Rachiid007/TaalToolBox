import { Role } from './../role/entities/role.entity';
import { Schoolclass } from './../schoolclass/entities/schoolclass.entity';
// import { School } from './../school/entities/school.entity';
import type { UserData, UserFormData } from './../types/index';
import {
  Injectable,
  NotFoundException,
  Inject,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserExcelDto } from './dto/create-user-excel.dto';
import { Users } from './entities/users.entity';
import { SchoolService } from '../school/school.service';
import { School } from 'src/school/entities/school.entity';
import { SchoolclassService } from '../schoolclass/schoolclass.service';
import { RoleService } from '../role/role.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  @Inject(SchoolService)
  private readonly schoolService: SchoolService;

  @Inject(SchoolclassService)
  private readonly schoolClassService: SchoolclassService;

  @Inject(RoleService)
  private readonly roleService: RoleService;

  async findOneUser(data: number | any): Promise<Users | undefined> {
    return await this.userRepository.findOne(data);
  }
  async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  // Get the user in database and her role
  async loginUser(email: string, password: string) {
    let userData: UserData;
    console.log(email);
    if (!email) {
      throw new NotFoundException();
    }
    // await this.roleService.findOne(wh:
    const role = await this.userRepository
      .createQueryBuilder('users')
      .innerJoinAndSelect('users.role', 'role')
      .where({ email: email })
      .getOne();
    //Decrypter le mot de passe du user
    //Get the users and here role
    if (!role.role.filter((x) => x.name === 'Administrateur').length) {
      // if (!role.role.includes('Administrateur')) {
      await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.role', 'role')
        .leftJoinAndSelect('users.schoolclass', 'schoolclass')
        .innerJoinAndSelect('schoolclass.school', 'school')
        .where({ email: email })
        .getOne()
        .then((user) => {
          userData = {
            name: user.name,
            surname: user.surname,
            role: user.role.map((x: { name: any }) => {
              return x.name;
            }),
            email: user.email,
            birthdate: user.birthdate,
            schoolClass: user.schoolClass.map((x: { name: any }) => {
              return x.name;
            }),
            school: user.schoolClass[0].school.name, //Lutilisateur ne fréquente qu'une seule école
            sex: user.sex,
          };
        })
        .catch((err) => {
          throw new NotFoundException(err);
        });
    } else {
      console.log('inside this');
      await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.role', 'role')
        .where({ email: email, password: password })
        .getOne()
        .then((user) => {
          console.log(user);
          userData = {
            name: user.name,
            surname: user.surname,
            role: user.role.map((x: { name: any }) => {
              return x.name;
            }),
            email: user.email,
            birthdate: user.birthdate,
            schoolClass: [],
            school: 'Institut Saint Joseph',
            sex: 'M',
          };
        })
        .catch((err) => {
          throw new NotFoundException(err);
        });
    }
    return userData;
  }
  public async createUser(payload: UserFormData) {
    // Normalement en front on doit récupérer toutes les écoles
    //

    const {
      name,
      surname,
      email,
      schoolEmail,
      password,
      birthdate,
      school,
      role,
      schoolClass,
      sex,
    } = payload;
    //1. Checker si l'utilisateur est déjà dans la base de données
    const checkUser: Users = await this.userRepository
      .createQueryBuilder()
      .where({ email: email })
      .getOne();

    if (checkUser) {
      console.log('utilsateur existant');
      throw new ConflictException('User already exist');
      // throw new InternalServerErrorException();
    }

    // 2. Récupérer l'id de l'école de l'élève (cela ne doit jamais être null : soit l'admin mentionne l'école soit on prend l'école du prof ou de l'admin)
    const schoolRequest: School = await this.schoolService.findSchool(school);

    // Prendre l'id de l'école de l'élève dans le frontend,
    // Le professeur ne peut pas créer des classes
    // 3. Checker si la classe de l'élève existe déjà dans la DB
    const schoolClassRequest: Schoolclass =
      await this.schoolClassService.findClassUser(
        schoolRequest.id,
        schoolClass,
      );
    let idSchoolClass: number;
    if (schoolClassRequest) {
      idSchoolClass = schoolClassRequest.id;
    } else {
      //4. inserer la classe de l'utilisateur si celle si n'existe pas
      // La requete suivante servira pour la création des classes
      // TODO NINSERE PAS LECOLE DE LUTILISATEUR
      const schoolClassInsert = await this.schoolClassService
        .create({
          name: schoolClass,
          schoolId: schoolRequest.id,
        })
        .catch((err) => {
          throw new InternalServerErrorException(err);
        });

      idSchoolClass = schoolClassInsert.identifiers[0].id;
    }
    //5. creer dabord l'utilisateur et récupérer son id
    const user: InsertResult = await this.userRepository
      .createQueryBuilder('users')
      .insert()
      .into('users', [
        'name',
        'surname',
        'email',
        'schoolEmail',
        'password',
        'birthdate',
        'sex',
      ])
      .values({
        name: name,
        surname: surname,
        email: email,
        schoolEmail: schoolEmail,
        password: password,
        birthdate: birthdate,
        sex: sex,
      })
      .execute()
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });

    const idUser: number = user.identifiers[0].id;

    //6. Lier l'utilisateur et sa classe
    await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('users_schoolclass_schoolclass')
      .values({ usersId: idUser, schoolclassId: idSchoolClass })
      .execute()
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });

    //7. Inserer maintenant le role de l'utilisateur
    // Récupérer l'id role de l'utilisateur et l'
    const roleRequest: Role = await this.roleService.findRole(role);
    const idRole: number = roleRequest.id;

    const userRole: InsertResult = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into('users_role_role')
      .values({ usersId: idUser, roleId: idRole })
      .execute()
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
    console.log(userRole);
  }

  async create(data: CreateUserDto): Promise<any> {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }

  async createUsersExcel(data: UserFormData[]) {
    // insert CreateUserExcelDto into users table and return the users inserted
    // return await this.createUser()
    data.map(async (user: UserFormData) => {
      return await this.createUser(user);
    });
    // return await this.userRepository.insert(
    //   data.map((user) => {
    //     return {
    //       name: user.name,
    //       surname: user.surname,
    //       schoolEmail: user.schoolEmail,
    //       email: user.email,
    //       birthdate: user.birthdate,
    //       sex: user.sex,
    //     };
    //   }),
    // );
  }
}
