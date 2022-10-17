import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({ ...createUserDto })
    user.salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, user.salt)
    try {
      this.usersRepository.save(user);
    } catch (e) {
      throw new ConflictException('le username et le password doit etre unique.')
    }
    console.log("user :", user)
    return user
  }




  async login(loginUserDto: LoginUserDto): Promise<Partial<User>> {
    const { username, password } = loginUserDto
    const user = await this.usersRepository.createQueryBuilder("user")
      .where("user.username = :username", { username }).getOne()
    if (!user) {
      throw new NotFoundException("uername does not exist !")
    }
    const hashedPassword = bcrypt.hash(password, user.salt)
    if (hashedPassword === user.password) {
      return {
        username,
        role: user.role
      }
    } else {
      throw new NotFoundException("the password is incorrect")
    }
  }



  /*
    findOne(id: number) {
      return `This action returns a #${id} user`;
    }
  
    update(id: number, updateUserDto: UpdateUserDto) {
      return `This action updates a #${id} user`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} user`;
    }*/
}
