import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  async createUser(createUserDto: CreateUserDto) : Promise<User> {
    const user = this.usersRepository.create( {...createUserDto} )
    user.salt =await bcrypt.genSalt()
    user.password =await  bcrypt.hash(user.password,user.salt)
    try{
      this.usersRepository.save(user);
    }catch(e) {
      throw new ConflictException('le username et le password doit etre unique.')
    }
    console.log("user :" , user)
    return user

  }

  /*findAll() {
    return `This action returns all user`;
  }

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
