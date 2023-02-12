import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService, private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
        boolean | 
        UrlTree |
        Promise<boolean | UrlTree> | 
        Observable<boolean | UrlTree>
    {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuthenticated = !user ? false : true;
                if(isAuthenticated) return true;
                return this.router.createUrlTree(['/auth']);
            }
        ));
    }
}