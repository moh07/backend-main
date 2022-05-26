import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
   } from "@nestjs/common";
   import { Reflector } from "@nestjs/core";
   import { Observable } from "rxjs";
import { userRoleEnum } from "src/enum/user.role.enum";
import { ROLES_KEY } from "src/shared/roles.decorators";
import { PersonEntity } from "../entities/person.entity";
   
   
   @Injectable()
   export class JwtRolesAdminGuardGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
   
    canActivate(
     context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
     const requiredRoles = this.reflector.getAllAndOverride<userRoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
     );
     if (!requiredRoles) {
      return true;
     }
   
     const { user }: { user: PersonEntity } = context.switchToHttp().getRequest();
     const succes = requiredRoles.some((role: any) => user.role === role);
     if (succes) {
      return true;
     } else {
      throw new UnauthorizedException();
     }
    }
   }