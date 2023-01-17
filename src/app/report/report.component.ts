import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Average } from '../average';
import { KanbanServiceService } from '../kanban-service.service';
import { ModalComponent } from '../modal/modal.component';
import { Reportobj } from '../reportobj';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  selectedOption!:String;
  avgData!:Average;
  avgData2!:Average;
  ListAvgData:Average[]=[];
  ListAvgData2:Average[]=[];
  msg!:String;
  msg2!:String;
  filter:any[] = [
    {value: 'monthlyreport', viewValue: 'Monthly Report',placeHoldervalue:'Enter month number'},
    {value: 'quaterlyreport', viewValue: 'Quaterly Report',placeHoldervalue:'Enter Q1/Q2/Q3/Q4'},
    {value: 'average', viewValue: 'Average',placeHoldervalue:'Location/All Locations'},
  ];

  reportdata!:any[];
  reportdata2!:any[];
  filterValue:string="Search";
  exportSuccess!:String;
  location!:any[];
  exportSuccess2!: String;
  

  constructor(private _service:KanbanServiceService,public dialogRef:MatDialogRef<ModalComponent>) { }

  ngOnInit(): void {
  }


  displayFilter(value:any){
    this.filterValue=value;
  }

  search(filterValue:any,inputValue:any){
    console.log(filterValue.value)
    console.log(inputValue)
    var reportObj=new Reportobj(filterValue.value,inputValue)
    if(filterValue.value=="average"&&inputValue!="All Location"){
      this._service.generateAverageReportPerLocation(reportObj).subscribe(
        response=>{console.log("response recieved for avg per location"+response),this.avgData=response,this.reportdata=this.reportdata2,this.ListAvgData=[],this.msg=this.msg2},
        error=>{console.log("error in avg data export "+error.message),this.msg="Please enter valid filter values",this.avgData=this.avgData2,this.reportdata=this.reportdata2,this.ListAvgData=this.ListAvgData2}
      );
    }
    else if(filterValue.value=="average"&&inputValue=="All Location"){
      this._service.getAllLocations(reportObj).subscribe(
        response=>{console.log("response received for list of location "+response),this.location=response;
        for (let i=0;i<this.location.length;i++){
          var reportObj=new Reportobj("average",this.location[i])
          this._service.generateAverageReportPerLocation(reportObj).subscribe(
            response=>{console.log("response recieved for avg per location"+response),this.ListAvgData.push(response),this.avgData=this.avgData2,this.reportdata=this.reportdata2,this.msg=this.msg2},
            error=>{console.log("error in avg data export")}
          );
        }
      },
        error=>{console.log("error occurred in list of location "+error)}
      );


    }
    else{
    this._service.generateReport(reportObj).subscribe(
      response=>{console.log("response received for report"+response);
      if(response!=null){
        this.exportSuccess=this.exportSuccess2,
        this.reportdata=response,this.avgData=this.avgData2,this.ListAvgData=this.ListAvgData2,this.msg=this.msg2}
      else{
        this.msg="Please enter valid filter values";
      }
      }
    );
    }

  }

  exportCsv(){
    this.avgData=this.avgData2;
   
    this._service.exportReportData(this.reportdata).subscribe(
      response=>{console.log("export csv response received");
      this.exportSuccess="Your Csv File is Successfully Exported to your Machine!!!"},
      error=>{console.log("error csv error happend",error.error)}

    );

}

exportAverageCsv(){
  this._service.exportAverageReportData(this.ListAvgData).subscribe(
    response=>{console.log("export csv response received");
    this.exportSuccess="Your Csv File is Successfully Exported to your Machine!!!"},
    error=>{console.log("error csv error happend",error.error)}

  );

}

closeModal(){
  this.dialogRef.close();
}
}
