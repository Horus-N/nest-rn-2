import {
  UnauthorizedException,
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(authDTO: AuthDTO) {
    try {
      const hashedPassword = await argon.hash(authDTO.password);

      const user = await this.prisma.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firstName: 'Tung',
          lastName: 'Nguyen',
        },
        select: {
          id: true,
          email: true,
          createAt: true,
        },
      });

      return {
        suscess: true,
        data: user,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('User with this email already exists!');
      }
      return {
        suscess: false,
        error: error,
      };
      // throw error;
    }
  }
  async login(authDTO: AuthDTO) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDTO.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const passwordMatches = await argon.verify(
      user.hashedPassword,
      authDTO.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Incorrect password!');
    }

    const jwt = await this.signJwtToken(user.id, user.email);

    return {
      success: true,
      data: {
        accessToken: jwt,
      },
    };
  }

  async signJwtToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    const jwtString = await this.jwtService.signAsync(payload, {
      expiresIn: '10m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return jwtString;
  }
}
