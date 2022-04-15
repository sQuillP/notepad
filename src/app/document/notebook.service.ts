import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Notebook } from "./Notebook.model";


@Injectable({
    providedIn:"root"
})
export class NotebookService implements OnInit{

    public notebooksSubject = new Subject<Notebook[]>();
    public currentNotebookSubject = new Subject<Notebook>();
    public currentIndexSubject = new Subject<number>();


    private currentNotebook:Notebook;
    private currentIndex:number;

    private notebooksArray:Notebook[] = [
        // new Notebook("Grocery list","apples, bananas, pears",new Date()),
        // new Notebook("Todos", "-clean my car", new Date())
    ];

    constructor(){}
    
    ngOnInit(): void {
    }
    addNotebook(notebook:Notebook):void{
        notebook.title = notebook.title.substring(0,20);
        this.notebooksArray.push(notebook);
        this.currentIndex = this.notebooksArray.length-1;
        this.notebooksSubject.next(this.notebooksArray);
        this.currentNotebookSubject.next(this.notebooksArray[this.currentIndex]); //or  subject.next(notebook);
        this.currentIndexSubject.next(this.currentIndex);
    }


    deleteNotebook():void{
        this.notebooksArray.splice(this.currentIndex, 1);
        this.currentIndex = null;
        this.currentNotebook = null;
        this.notebooksSubject.next(this.notebooksArray);
        this.currentNotebookSubject.next(null);
        this.currentIndexSubject.next(this.currentIndex)
    }


    saveNotebook(notebook: Notebook):void{
        this.notebooksArray[this.currentIndex] = notebook;
        this.notebooksSubject.next(this.notebooksArray);
        this.currentNotebookSubject.next(notebook);
    }


    updateNotebookName(title:string):void{
        this.notebooksArray[this.currentIndex].title = title.substring(0,20);
        this.saveNotebook(this.notebooksArray[this.currentIndex])
    }


    getNotebook(index: number):Notebook{
        return this.notebooksArray[index];
    }


    get getCurrentNotebook():Notebook{
        if(!this.currentNotebook)
            return this.notebooksArray[0];
        return this.currentNotebook;
    }


    set setCurrentNotebook(index:number){
        this.currentNotebook = this.notebooksArray[index];
        this.currentIndex = index;
        this.currentIndexSubject.next(index);
        this.currentNotebookSubject.next(this.currentNotebook);
    }


    get getNotebooks():Notebook[]{
        return this.notebooksArray;
    }
}