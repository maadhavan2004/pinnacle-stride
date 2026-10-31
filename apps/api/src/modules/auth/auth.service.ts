import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginInput, loginSchema } from '@ps/schemas';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(payload: unknown) {
    const parseResult = loginSchema.safeParse(payload);
    if (!parseResult.success) {
      throw new BadRequestException('Invalid credentials format');
    }

    const { email, password } = parseResult.data;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.isActive) {
      // Generic error message per security requirement Document 5 §5.6
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Check account lockout
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new UnauthorizedException('Account temporarily locked due to multiple failed attempts. Please try again later.');
    }

    // Verify Argon2id hash
    const isValid = await argon2.verify(user.passwordHash, password);
    if (!isValid) {
      const failed = user.failedLogins + 1;
      const lockedUntil = failed >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;
      await this.prisma.user.update({
        where: { id: user.id },
        data: { failedLogins: failed, lockedUntil },
      });
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Reset failed logins & update lastLoginAt
    await this.prisma.user.update({
      where: { id: user.id },
      data: { failedLogins: 0, lockedUntil: null, lastLoginAt: new Date() },
    });

    // Generate random session token
    const sessionToken = crypto.randomBytes(32).toString('hex');

    return {
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
      token: sessionToken,
    };
  }
}
