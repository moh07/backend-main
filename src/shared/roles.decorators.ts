import { SetMetadata } from "@nestjs/common";
import { userRoleEnum } from "src/enum/user.role.enum";


export const ROLES_KEY = "roles";
export const Roles = (...roles: userRoleEnum[]) =>
 SetMetadata(ROLES_KEY, roles);