// user.dto.ts
import { IsEmail, IsString, IsOptional, IsUrl } from 'class-validator';

export class UserDto {
  @IsOptional()
  id?: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsUrl()
  profilePic?: string;

  @IsEmail()
  email: string;
}
