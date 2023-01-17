import { Component,OnChanges, OnInit,Input, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { User } from '../user';
import { KanbanServiceService } from '../kanban-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { CandidateModelComponent } from '../candidate-model/candidate-model.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Status } from '../status';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
// import {ClickOutsideModule} from 'ng-click-outside';
import { CustomTag } from '../custom-tag';
import { MatSelectModule } from '@angular/material/select';
import { SearchModalComponent } from '../search-modal/search-modal.component';
import { Search } from '../search';
import { Candidate } from '../candidate';
import { ReportComponent } from '../report/report.component';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.css']
})
export class LoginSuccessComponent {

  filter: any[] = [
    { value: 'gcm', viewValue: 'GCM' },
    { value: 'position', viewValue: 'Position' },
    { value: 'project', viewValue: 'Project' },
    { value: 'duedate', viewValue: 'DueDate' },
    { value: 'candidatename', viewValue: 'CandidateName' },
    { value: 'candidateid', viewValue: 'CandidateId' }
  ];

  searchData: Candidate[] = [];


  filterValue!: string;


  gcmlevel!: String;
  position!: String;
  project!: String;
  duedate!: String;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchValue: any[] = [];

  isValid: boolean = true;

  globalIndex!: number;
  // ModalVariables------

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent, any> | undefined;
  candidateModalDialog: MatDialogRef<CandidateModelComponent, any> | undefined;
  searchModalDialog: MatDialogRef<SearchModalComponent, any> | undefined;
  reportModalDialog: MatDialogRef<ReportComponent, any> | undefined;

  // -----------------
 

  // -----------------

  objData: any;
  _route: any;

  constructor(private _service: KanbanServiceService, public matDialog: MatDialog,
    @Inject(DOCUMENT) document: Document) {
  }


  data: any[] = [];
  backlog: any[] = [];
  inProgress: any[] = [];
  inReview: any[] = [];
  done: any[] = [];


  methodToUpdateStatus(container:Status){

    this._service.updateStatus(container).subscribe(
      response => {
        console.log("response received for data update");
        location.reload()
      },
      error => {
        console.log("error occurred in data updatation" + error)
      }
    )
  }

  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log(event.currentIndex);
      console.log(event)
      console.log(event.container.element.nativeElement.id);
      var dumpContainer = event.container.element.nativeElement.id;
      console.log("This is the value of dumpContainer" + dumpContainer)

      if (dumpContainer == "backlog") {
        console.log("this is container 1")
        console.log(this.backlog[event.currentIndex])
        var id = this.backlog[event.currentIndex].candidateId;
        var prevContainer:String=this.backlog[event.currentIndex].status;
        console.log("This is the previous Container "+this.backlog[event.currentIndex].status)
        console.log(id);
        var container = new Status("Shortlist",id,prevContainer);
        this.methodToUpdateStatus(container);

        // this._service.updateStatus(container).subscribe(
        //   response => {
        //     console.log("response received for data update")
        //   },
        //   error => {
        //     console.log("error occurred in data updatation" + error)
        //   }
        // )
      }
      else if (dumpContainer == "inProgress") {
        console.log("this is container 2")
        console.log(this.inProgress[event.currentIndex])
        var id = this.inProgress[event.currentIndex].candidateId;
        var prevContainer:String=this.inProgress[event.currentIndex].status;
        console.log("This is the previous Container "+this.inProgress[event.currentIndex].status)
        console.log(id);
        var container = new Status("Interview In Progress", id,prevContainer)
        this.methodToUpdateStatus(container);
 
        // this._service.updateStatus(container).subscribe(
        //   response => {
        //     console.log("response received for data update")
        //   },
        //   error => {
        //     console.log("error occurred in data updatation" + error)
        //   }
        // )
      }

      else if (dumpContainer == "inReview") {
        console.log("this is container 3")
        console.log(event.container)
        console.log(this.inReview[event.currentIndex])
        var id = this.inReview[event.currentIndex].candidateId;
        var prevContainer:String=this.inReview[event.currentIndex].status;
        console.log("This is the previous Container "+this.inReview[event.currentIndex].status)
        console.log(id);
        var container = new Status("HR Review", id,prevContainer)
        this.methodToUpdateStatus(container);

        // this._service.updateStatus(container).subscribe(
        //   response => {
        //     console.log("response received for data update")
        //   },
        //   error => {
        //     console.log("error occurred in data updatation" + error)
        //   }
        // )
      }
      else if (dumpContainer == "done") {
        var id = this.done[event.currentIndex].candidateId;
        var prevContainer:String=this.done[event.currentIndex].status;
        console.log(this.done[event.currentIndex])
        console.log("This is the previous Container "+this.done[event.currentIndex].status)
        console.log(id);
        var container = new Status("Hired", id,prevContainer);
        this.methodToUpdateStatus(container);

        // this._service.updateStatus(container).subscribe(
        //   response => {
        //     console.log("response received for data update")
        //   },
        //   error => {
        //     console.log("error occurred in data updatation" + error)
        //   }
        // )
      }

    }

  }


  display(event: any) {
    console.log("The div is hit")
    console.log(event);
    this.dialogConfig.id = "modalId";
    this.dialogConfig.height = "250vh";
    this.dialogConfig.width = "650px";
    this.dialogConfig.panelClass = "trend-dialog"
    this._service.sendObject(event);

    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig)
  }

  registerCandidate() {
    this.dialogConfig.id = "modalButton";
    this.dialogConfig.height = "650px";
    this.dialogConfig.width = "750px";
    // this.dialogConfig.="10px";
    this.candidateModalDialog = this.matDialog.open(CandidateModelComponent, this.dialogConfig);

  }

  add(event: MatChipInputEvent): void {
    console.log("This is mat chip event")
    console.log(event)
    console.log(event.chipInput.id)


    const value = (event.value || '').trim();
    console.log(value)

    if (value) {
      console.log("this is mat chip value")
      console.log(value)
      this.searchValue.push({ name: value });
    }
    event.chipInput!.clear();
  }


  remove(fruit: any): void {
    const index = this.searchValue.indexOf(fruit);

    if (index >= 0) {
      this.searchValue.splice(index, 1);
    }

  }

  ngOnInit(): void {

    this.getAll();

    this._service.Refresh.subscribe(response => {

      this.backlog=[];this.inProgress=[];this.inReview=[];this.done=[];this.getAll();
      // this.getAll();

    });
  }



    getAll(){
      console.log("Get Data Hit")
      // window.location.reload();
      this._service.getDataFromBackend(this.data).subscribe(

        response => {
          console.log('response received')
          this.data = response;
          console.log(response)
          for (let i = 0; i < this.data.length; i++) {

            if (this.data[i].status == "Shortlist") {
              this.backlog.push(this.data[i])


            }
            else if (this.data[i].status == "Interview In Progress") {
              this.inProgress.push(this.data[i])
            }
            else if (this.data[i].status == "HR Review") {
              this.inReview.push(this.data[i])
            }
            else if (this.data[i].status == "Hired") {
              this.done.push(this.data[i])
            }

          }

        },
        error => {
          console.log("exception occurred");
        }
      );
  }
 


  displayGCM(value: String, id: String) {
    console.log(value)
    value = value.trim();
    var columnName: String = "gcm"
    var obj = new CustomTag(value, columnName, id);
    window.location.reload();
    console.log(obj);
    this._service.updateCustomTags(obj).subscribe(
      response => { (console.log("response received")) },
      error => { console.log("error occured") }
    );
  }

  displayPosition(value: String, id: String) {
    value = value.trim();
    var columnName: String = "position"
    var obj = new CustomTag(value, columnName, id);
    window.location.reload();
    this._service.updateCustomTags(obj).subscribe(
      response => { (console.log("response received")) },
      error => { console.log("error occured") }
    );
  }

  displayDueDate(value: String, id: String) {
    value = value.trim();
    var columnName: String = "duedate"
    var obj = new CustomTag(value, columnName, id);
    window.location.reload();
    this._service.updateCustomTags(obj).subscribe(
      response => { (console.log("response received")) },
      error => { console.log("error occured") }
    );
  }

  displayProject(value: String, id: String) {
    value = value.trim();
    var columnName: String = "project"
    var obj = new CustomTag(value, columnName, id);
    window.location.reload();
    this._service.updateCustomTags(obj).subscribe(
      response => { (console.log("response received")) },
      error => { console.log("error occured") }
    );

  }

  displayFilter(value: any) {
    this.filterValue = value;
  }


  search(filterVal: any, inputVal: any) {
    // console.log(filterVal.value);
    // console.log(inputVal);
    inputVal = inputVal.trim();
    this.dialogConfig.id = "modalButton";
    this.dialogConfig.height = "600px";
    this.dialogConfig.width = "800px";
    var searchObj = new Search(filterVal.value, inputVal);
    this._service.storeObj(searchObj);
    this.searchModalDialog = this.matDialog.open(SearchModalComponent, this.dialogConfig);
  }

  openReport() {
    this.dialogConfig.id = "modalButton";
    this.dialogConfig.height = "350px";
    this.dialogConfig.width = "500px";
    this.reportModalDialog = this.matDialog.open(ReportComponent, this.dialogConfig)
  }


}



// this._service.searchData(searchObj).subscribe(
//   response=>{console.log("response received for search");this.searchData=response;this._service.storeData(this.searchData)},
//   error=>{console.log("error happend in search response")}
// );