import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("/create")
  async reate(@Body() createUserDto: CreateUserDto): Promise<User> {
    console.log("i am here ")
    return await this.userService.createUser(createUserDto);
  }
  @Post("/login")
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log("hello")
    return await this.userService.login(loginUserDto);
  }

  /*
    @Get()
    findAll() {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.userService.findOne(+id);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      return this.userService.update(+id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.userService.remove(+id);
    }*/
}
