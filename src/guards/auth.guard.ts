import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TokenAuthService } from "src/modules/auth/services/token.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenAuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;

      if (!authorization || authorization.trim() === "") {
        throw new UnauthorizedException("Please provide a token");
      }

      const authToken = authorization.replace("Bearer", "").trim();
      const response = await this.tokenService.validateToken(authToken);
      request.decodeData = response;
      return true;
    } catch (error) {
      console.log("auth error - ", error.message);
      throw new ForbiddenException(error.message || "Session Expired");
    }
  }
}
