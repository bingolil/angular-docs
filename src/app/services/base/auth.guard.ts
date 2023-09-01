import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageUtil } from 'src/app/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { url } = state;
    return this.checkAuth(url);
  }

  private checkAuth(url: string): true | UrlTree {
    if (StorageUtil.getToken()) {
      return true;
    } // redirectTo url
    return this.router.parseUrl('/login?redirectTo=' + url);
  }
}
