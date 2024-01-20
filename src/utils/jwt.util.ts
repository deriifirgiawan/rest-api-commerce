import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JWTUtil {
  constructor(private readonly jwtService: JwtService) {}

  decode(token: string): any {
    const jwt = token.replace("Bearer ", "");
    return this.jwtService.decode(jwt, { json: true });
  }
}
