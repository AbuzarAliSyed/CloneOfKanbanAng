import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KanbanServiceService } from '../kanban-service.service';
import { AuthService } from './auth.service';
import {User} from '../user';
import { Router } from '@angular/router';

//i want a user data here

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  
  getStatus="";
  constructor(private _service:KanbanServiceService,private  _route:Router){  
  }

  


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const {routeConfig}=route;

    const {path}=routeConfig as Route;
    
    var value:any=this._service.statusSend(this.getStatus);
    console.log(value);
    if(path?.includes('login-success') && value=="ok"){
      return true;
    }
    
    return false;
    
  }

  

  
  
}
