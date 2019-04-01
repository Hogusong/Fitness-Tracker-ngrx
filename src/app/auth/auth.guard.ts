import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from "@angular/router";
import { Observable } from "rxjs";
import { take } from 'rxjs/operators';
import { Store } from "@ngrx/store";

import * as rootReducer from '../reducers/root.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<rootReducer.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(rootReducer.getAuthStatus).pipe(take(1));
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(rootReducer.getAuthStatus).pipe(take(1));
  }
}
