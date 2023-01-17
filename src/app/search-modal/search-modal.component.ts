import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { responsiveLayout } from '@igniteui/material-icons-extended';
import { Candidate } from '../candidate';
import { KanbanServiceService } from '../kanban-service.service';
import { Search } from '../search';

@Component({
  selector: 'app-search-modal',
  templateUrl: './search-modal.component.html',
  styleUrls: ['./search-modal.component.css']
})
export class SearchModalComponent implements OnInit {


  exportSuccess!:String;
  searchObj!:Search;
  searchData:Candidate[]=[];
  constructor(private _service:KanbanServiceService,public dialogRef:MatDialogRef<SearchModalComponent>) { }

  ngOnInit(): void {
    this._service.searchData(this.searchObj).subscribe(
      response=>{this.searchData=response},
      error=>{console.log("error happend")}
    );
  }

  closeModal(){
    this.dialogRef.close();
  }

  exportCsv(){
    this._service.exportCsvData(this.searchObj).subscribe(
      response=>{console.log("export csv response received");this.exportSuccess="Your Csv File is Successfully Exported to your Machine!!!"},
      error=>{console.log("error csv error happend",error.error)}
    );
  }


}
