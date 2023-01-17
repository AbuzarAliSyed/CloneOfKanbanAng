import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { KanbanServiceService } from '../kanban-service.service';
import {User} from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg="";
  user =new User();

  constructor(private _service:KanbanServiceService,private _route:Router) { 

  }

  ngOnInit(): void {
  }

  logInUser(){
    this._service.logInUserFromRemote(this.user).subscribe(
      data=>{
        console.log('response received '+data);
        console.log(this.user)
        this._service.statusReceived("ok")
        this._route.navigate(['./login-success'])
      },
    error=>{
      console.log("exception Occured "+error);
      console.log(this.user)
      this._service.statusReceived("notok")
      this.msg="bad Credentials please enter valid DasId and Password"
    }
    );
  }

  gotoregistration(){
    this._route.navigate(['./register'])
  }

}
