export class Comment {
    id:String;
    comment:String;
    month:String;
    date:number;
    hours:number;
    minutes:number;
    meridian:string

    constructor(v1:String,v2:String,v3:String,v4:number,v5:number,v6:number,v7:string){
        this.id=v1;
        this.comment=v2;
        this.month=v3;
        this.date=v4;
        this.hours=v5;
        this.minutes=v6;
        this.meridian=v7;
    }
}
