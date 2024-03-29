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
import { School } from '../school/entities/school.entity';
import { SchoolclassService } from '../schoolclass/schoolclass.service';
import { RoleService } from '../role/role.service';
import * as argon2 from 'argon2';
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

  async findOne(data: number | any): Promise<Users | undefined> {
    return await this.userRepository.findOne({ where: { id: data } });
  }
  async findByEmail(email: string): Promise<Users> {
    return await this.userRepository.findOne({ where: { email: email } });
  }
  // Get the user in database and her role
  async loginUser(email: string) {
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
    // .catch((err) => {
    //   console.log(err);
    // });
    console.log(role);
    if (!role) {
      throw new NotFoundException();
    }
    //Decrypter le mot de passe du user
    //Get the users and here role
    if (!role.role.filter((x) => x.name === 'Administrateur').length) {
      console.log('pass ok');
      await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.role', 'role')
        .leftJoinAndSelect('users.schoolclass', 'schoolclass')
        .innerJoinAndSelect('schoolclass.school', 'school')
        .where({ email: email })
        .getOne()
        .then((user) => {
          console.log(user);
          userData = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            role: user.role.map((x: { name: any }) => {
              return x.name;
            }),
            email: user.email,
            birthdate: user.birthdate,
            schoolClass: user.schoolclass.map((x: { name: any }) => {
              return x.name;
            }),
            school: user.schoolclass[0].school.name, //Lutilisateur ne fréquente qu'une seule école
            sex: user.sex,
            score: user.score,
          };
        })
        .catch((err) => {
          console.log(err);
          throw new NotFoundException(err);
        });
    } else {
      console.log('inside this');
      await this.userRepository
        .createQueryBuilder('users')
        .innerJoinAndSelect('users.role', 'role')
        .where({ email: email })
        .getOne()
        .then((user) => {
          console.log(user);
          userData = {
            id: user.id,
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
            score: 100000,
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
    payload['password'] = await argon2.hash(payload['password']);
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
    console.log(payload);
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
        'score',
      ])
      .values({
        name: name,
        surname: surname,
        email: email,
        schoolEmail: schoolEmail,
        password: password,
        birthdate: birthdate,
        sex: sex,
        score: 0,
      })
      .execute()
      .catch((err) => {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
        throw new InternalServerErrorException(err);
      });
    return true;
  }

  async create(data: CreateUserDto): Promise<any> {
    return await this.userRepository
      .save(data)
      .then((res) => res)
      .catch((e) => console.log(e));
  }

  async createUsersExcel(data: UserFormData[]) {
    data.map(async (user: UserFormData) => {
      return await this.createUser(user);
    });
  }
  //cette fonction permet de recupérer le nombre d'utilisateur inscrit par classe sous la responsabilité d un prof ayant userId.
  async findSubscriptionStats(userId: number): Promise<Users | undefined> {
    const subscriptionStats = this.userRepository.query(
      `select school.name || ' - ' ||schoolclass."name" as SchoolClass_name,count(*) from schoolclass
      join users_schoolclass_schoolclass on schoolclass.id=users_schoolclass_schoolclass."schoolclassId"
      join school on school.id = schoolclass."schoolId"
      where school.id in (select schoolclass."schoolId" from schoolclass where schoolclass.id in (select users_schoolclass_schoolclass."schoolclassId" from users_schoolclass_schoolclass where users_schoolclass_schoolclass."usersId"=${userId}))
      group by school.name,schoolclass.name;`,
    );
    return await subscriptionStats;
  }

  async findActivePlayersCount(userId: number): Promise<Users | undefined> {
    const subscriptionStats = this.userRepository.query(
      `select A.name,count(*) from
      (select  distinct user_response."userId", schoolclass."name" as name from user_response
            left join users_schoolclass_schoolclass on user_response."userId"=users_schoolclass_schoolclass."usersId"
          left join schoolclass on schoolclass.id=users_schoolclass_schoolclass."schoolclassId"
            left join school on school.id = schoolclass."schoolId"
            where school.id in (select schoolclass."schoolId" from schoolclass where schoolclass.id in (select users_schoolclass_schoolclass."schoolclassId" from users_schoolclass_schoolclass where users_schoolclass_schoolclass."usersId"=${userId}))  
        group by user_response."userId",schoolclass.name) as A
        group by A.name`,
    );
    return await subscriptionStats;
  }

  async getScore(email: string) {
    let userScore: { score: number } = { score: 0 };
    await this.userRepository
      .createQueryBuilder('users')
      .where({ email: email })
      .getOne()
      .then((user) => {
        userScore = {
          score: user.score,
        };
      })
      .catch((err) => {
        console.log(err);
        throw new NotFoundException(err);
      });
    return userScore;
  }

  async addScore(payload: { email: string; numberToAdd: number }) {
    const currentScore: { score: number } = await this.getScore(payload.email);
    console.log(currentScore);
    const newScore: number = currentScore.score + payload.numberToAdd;
    await this.userRepository
      .createQueryBuilder('users')
      .update('users')
      .set({ score: newScore })
      .where({ email: payload.email })
      .execute()
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(err);
      });
    return newScore;
  }
}
