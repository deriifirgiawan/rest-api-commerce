import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenAuthService {
  constructor(private jwt: JwtService) {}

  async signToken(id: string, roleId: number): Promise<string> {
    const payload = { id, roleId };
    const token = await this.jwt.signAsync(payload);
    return token;
  }

  async validateToken(token: string) {
    return this.jwt.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
