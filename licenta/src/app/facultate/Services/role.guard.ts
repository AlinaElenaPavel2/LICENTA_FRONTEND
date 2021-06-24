import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './LoginService/login.service';
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: LoginService, public router: Router){}
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {   
    // on the data property
    const expectedRole = route.data.expectedRole;
    const role = sessionStorage.getItem('role');
    console.log("real role:")
    console.log(role)
        if (!this.auth.isAuthenticated() || role !== expectedRole) {
      return false;
    }
    return true;
  }
}
