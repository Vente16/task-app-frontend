import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AtuhServiceService } from 'src/app/services/atuh-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {



  constructor(private auth:AtuhServiceService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

     return this.auth.userValidate();

  }

}
