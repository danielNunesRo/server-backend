import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../role/role.enum';
import { ROLES_KEY } from '../decorator/roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndMerge<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
  
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; 

 
    if (!user) {
      console.warn('No user found in the request context.');
      return false;
    }


    return user?.role === Role.ADMINISTRADOR || requiredRoles.some(role => user?.role === role);
  }
}