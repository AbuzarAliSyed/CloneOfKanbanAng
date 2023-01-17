import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { NgForm } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { KanbanServiceService } from '../kanban-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user=new User();
  msg:any;

  constructor(private _service:KanbanServiceService,private _route:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._service.registerUserFromRemote(this.user).subscribe(
      data=>{
        console.log("response received");
        this.msg="Regitration Successfull";
        this._route.navigate([''])
      },
      error=>{
        console.log("exception occurred");
        this.msg=error.error;
        console.log(this.msg);
      }
    )
  }


  gotologin(){
    this._route.navigate([''])
  }
  
}
