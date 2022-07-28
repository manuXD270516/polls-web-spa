import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  TitleStrategy,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate() {
    const userId = localStorage.getItem('UserId') || -1;
    console.log('User ID from Guard: ', userId);
    const activateResult = userId != -1;
    if (!activateResult) {
      this._router.navigate(['auth/login']);
    }
    return activateResult;
  }
}
