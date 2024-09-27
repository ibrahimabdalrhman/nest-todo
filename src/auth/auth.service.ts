import { forwardRef, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service'; // Adjust the path according to your project structure
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne(loginDto.email);
    console.log(user);

    if (user && bcrypt.compare(loginDto.password, user.password)) {
      console.log('done');

      return user;
    }
    console.log('none');

    return null;
  }

  async login(user) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    console.log(payload);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto) {
    const hashedPassword = await bcrypt.hash(signupDto.password, 12);
    return await this.userService.create({
      ...signupDto,
      password: hashedPassword,
    });
  }

  // async thisIsMe(currentUser: CurrentUser, user): Promise<Boolean> {
  //   if (currentUser.sub === user._id.toString()) {
  //     return true;
  //   }
  //   return false;
  // }

  // async thisIsAdmin(currentUser: CurrentUser): Promise<boolean> {
  //   return currentUser.roles.some((role) => role === Role.ADMIN);
  // }
}
