import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotebookService } from './notebook.service';
import { Notebook } from './Notebook.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit, OnDestroy{


  constructor(private notebookService:NotebookService,
              private renderer:Renderer2) { 
  }


  @ViewChild("overlayRef") overlayRef:ElementRef;
  @ViewChild("overlayBtn") overlayBtn:ElementRef;

  currentNotebook:Notebook;

  currentNotebookSubscription:Subscription;

  content:string;

  notebookTitle:string;

  editTitle:boolean = false;

  ngOnInit(): void {
   this.currentNotebookSubscription = this.notebookService.currentNotebookSubject
    .subscribe((notebook:Notebook)=>{
      this.currentNotebook = notebook;
      if(this.currentNotebook)
        this.content = this.currentNotebook.content;
    });
    this.currentNotebook = this.notebookService.getCurrentNotebook;
    if(this.currentNotebook)
      this.content = this.currentNotebook.content;
  }



  ngOnDestroy(): void {
      this.currentNotebookSubscription.unsubscribe();
  }


  onAddNotebook():void{

  }


  onDismissOverlay(event:Event):void{
    if(event.target === this.overlayRef.nativeElement || event.target === this.overlayBtn.nativeElement){
      this.editTitle = false;
      this.notebookService.updateNotebookName(this.notebookTitle);
    }
  }


  onDeleteNotebook():void{
    this.notebookService.deleteNotebook()
  }


  onSaveNotebook():void{
    if(!this.currentNotebook) return;
    this.currentNotebook.content = this.content;
    this.notebookService.saveNotebook(this.currentNotebook);
  }


  onEditNotebookName():void{
    this.editTitle = true;
    this.notebookTitle = this.currentNotebook.title;
  }




}
