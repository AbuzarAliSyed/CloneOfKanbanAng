import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { KanbanServiceService } from '../kanban-service.service';
import {HttpClient,HttpEventType} from '@angular/common/http';
import { Candidate } from '../candidate';
import { Comment } from '../comment';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { Tags } from '../tags';
import { Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  public userFile:any=File;
  formdata:any=FormGroup;
  _route: any;
 
  constructor(private _service:KanbanServiceService,
    public dialogRef:MatDialogRef<ModalComponent>,
    private _http:HttpClient) { }

  @Input() index!: number;
  candidateObj:any;
  commentObj:any;
  tagsObj:any;

  commentList:Comment[]=[];
  tagsList:Tags[]=[];
  
  // Upload Image Parameter-------------
  

  uploadImage!:File;
  dbImage:any;
  postResponse:any;
  successResponse!:String;
  image:any;
  commentMsg!:String;
  tagsMsg!: String;
  uploadmsg!:String;



  // --------------------------------------
  

            

  ngOnInit(): void {
    
    console.log("nginIt activated")
    this._service.giveDatatoModal(this.candidateObj).subscribe(
      response=>{console.log("i am give data");console.log(response);this.candidateObj=response},
      error=>{("error occurred")}
    );
    this._service.showAllComments(this.commentObj).subscribe(
      response=>{console.log("i am all comment");console.log("getting all the comments ok");this.commentList=response},
      error=>{console.log("getting all the comments are not ok")}
    );
    this._service.getTags(this.tagsObj).subscribe(
      response=>{console.log("i got all tags");console.log(response);this.tagsList=response},
      error=>{console.log("------------------------>getting all the tags are not ok"+error.message)}
    );
    console.log("This is from modal component")

  }


  closeModal(){
    this.dialogRef.close();
  }

  onImageUpload(event:any){
    this.uploadImage=event.target.files[0];
  }
  
  imageUploadAction(){
    const imageFormData=new FormData();
    imageFormData.append('image',this.uploadImage,this.uploadImage.name);
    this._service.uploadingImage(imageFormData).subscribe(
      response=>{console.log("response received");this.postResponse=response;0
                                                  this.successResponse=this.postResponse.body.message},
      error=>{("error occurred");this.successResponse="Image failed to upload"}
    );
  }

  viewImage(){
    this._service.viewingImage(this.image).subscribe(
      response=>{this.postResponse=response;this.dbImage='data:image/jpeg;base64,'+this.postResponse.image},
      error=>{}
    );
  }

  getComment(value:String){
    if(value==""){
      console.log("you cannot pass empty value in comment");
      this.commentMsg="Please enter comment";
      return;
    }
    var comMsg!:String;
    this.commentMsg=comMsg;
    let date:Date=new Date();
    var month:{[key:number]:string}={1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"}
    if(date.getHours()>=12){
      var meridian:string="PM";
    }
    else{
      var meridian:string="AM";
    }
    console.log(month[date.getMonth()+1]+" "+date.getDate()+" "+date.getHours()+" "+date.getMinutes()+" "+meridian)
    var commentObj=new Comment(this.candidateObj.candidateId,value,month[date.getMonth()+1],date.getDate(),date.getHours(),date.getMinutes(),meridian);
    this._service.getAllComments(commentObj).subscribe(
      response=>{console.log("response recieved for comment section");this.commentList=response},
      error=>{console.log("error occurred in comment section response")}
    );
  }

  onSelectFile(event:any){
    const file=event.target.files[0];
    // console.log(file);
    this.userFile=file;
  }

  submitImage(formdata:FormGroup){
    const user=formdata.value;
    var formData=new FormData();
    formData.append('user',JSON.stringify(user));
    formData.append('file',this.userFile);
    formData.append('candidateId',this.candidateObj.candidateId);
    this._service.saveCandidateImage(formData).subscribe(
      response=>{console.log("response received for image upload"),
      this.uploadmsg="You file is successfully uploaded"},
      error=>{console.log("error while uploading the image")}
    );
    console.log(formData)
  }

  addTag(value:string){
    console.log("This is the value"+ value);
    if(!value){
      console.log("you cannot pass empty value in Add Tag");
      this.tagsMsg="Please enter Tag value";
      return;
    }

    var tagsObj=new Tags(this.candidateObj.candidateId,value);
    console.log("_"+this.candidateObj.candidateId);
    this._service.getAllTags(tagsObj).subscribe(
      response=>{console.log("response recieved for addTags section");console.log(response);this.tagsList=response},
      error=>{console.log("error occurred in addTag modal section response")}
    );
  }

  deleteTag(value:any){
    console.log("in modal deleteTag");
    console.log("this is indexNo"+this.index);
    console.log("-->"+value);
    var tagsObj=new Tags(this.candidateObj.candidateId,value);
    console.log(tagsObj);
  }
}




