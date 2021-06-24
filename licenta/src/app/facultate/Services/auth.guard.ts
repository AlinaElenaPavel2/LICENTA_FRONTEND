import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './LoginService/login.service';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthGuardService  implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
   constructor(public auth: LoginService, public router: Router) {}
    
    canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/university/login']);
      return false;
    }
    return true;
  }
  
}
