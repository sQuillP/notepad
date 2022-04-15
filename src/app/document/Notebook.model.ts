export class Notebook{

    private _title:string;
    private _content:string;
    private _dateCreated: Date;

    constructor(title:string, content:string, dateCreated:Date){
        this._title = title;
        this._content = content;
        this._dateCreated = dateCreated;
    }


    set content(content: string){
        this._content = content;
    }


    set title(title:string){
        this._title = title;
    }


    set dateCreated(dateCreated:Date){
        this._dateCreated = dateCreated;
    }


    get title():string{
        return this._title;
    }


    get content():string{
        return this._content;
    }


    get dateCreated():Date{
        return this._dateCreated;
    }


}