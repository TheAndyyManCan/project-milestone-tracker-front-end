import { Pipe, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).authenticated$.pipe(take(1), map(authenticated => {
        console.log(authenticated);
        if(authenticated){
            return authenticated;
        } else {
            return inject(Router).createUrlTree(["login"]);
        }
    }));
};

export const notAuthGuard: CanActivateFn = (route, state) => {
    return inject(AuthService).authenticated$.pipe(take(1), map(authenticated => {
        console.log(authenticated);
        if(authenticated){
            return inject(Router).createUrlTree(["/"]);
        } else {
            return true;
        }
    }));
};
