import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from '../candidate';
import { KanbanServiceService } from '../kanban-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-model',
  templateUrl: './candidate-model.component.html',
  styleUrls: ['./candidate-model.component.css']
})
export class CandidateModelComponent implements OnInit {

  candidate = new Candidate();
  msg: any;

  constructor(private service: KanbanServiceService, private _route: Router, public dialogRef: MatDialogRef<CandidateModelComponent>) { }

  registerCandidate() {
    this.service.registerCandidateFromRemote(this.candidate).subscribe(
      response => {
        console.log("response received");
        this.msg = "Registration Successfull"
        this.dialogRef.close()
      },
      error => {
        console.log("error occurred");
        this.msg = error.error
      }
    );

  }

  gotoDashboard() {

  }


  ngOnInit(): void {
  }


  closeModal() {
    this.dialogRef.close(false);
  }



}
