import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDto } from './user.dto';

@Controller('api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('authenticate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async authenticateUser(@Body() user: UserDto) {
    const existingUser = await this.usersService.findOne(user.email);
    return existingUser ? existingUser : this.usersService.create(user);
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.usersService.findOne(email);
  }
}
