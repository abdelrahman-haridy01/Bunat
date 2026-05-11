import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtSignOptions, JwtService } from '@nestjs/jwt';

import { verifyPassword } from 'src/common/utils/password.util';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const passwordMatches = await verifyPassword(loginDto.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET', 'change-me'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '1d') as JwtSignOptions['expiresIn'],
      }),
      user: this.usersService.toSafeUser(user),
    };
  }
}
