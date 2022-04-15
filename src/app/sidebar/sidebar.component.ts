import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { Notebook } from '../document/Notebook.model';
import { NotebookService } from '../document/notebook.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {

  toggleSidebar:boolean = false;

  notebooks:Notebook[];

  selectedNotebookIndex:number;

  notebooksSubscription:Subscription;
  
  notebookIndexSubscription:Subscription;

  notebookName:string;

  newlyCreatedNotebook:boolean = false;

  private clickListener:()=>void;

  private keypressListener:()=>void;

  interval;
  @ViewChild("notebookInputRef") notebookInputRef:ElementRef
  @ViewChild("addNote") addNote:ElementRef;

  constructor(private notebookService:NotebookService, private renderer:Renderer2) { 
    this.clickListener = this.renderer.listen("window","click", (e:Event)=>{
      if(this.notebookInputRef && e.target !== this.notebookInputRef.nativeElement && !this.addNote.nativeElement.contains(e.target)){
        this.updateBookName();
        this.newlyCreatedNotebook = false;
      }
    });
    this.keypressListener = this.renderer.listen("window","keypress",(e:KeyboardEvent)=>{
      if(e.key === "Enter" && this.newlyCreatedNotebook){
        this.updateBookName();
        this.newlyCreatedNotebook = false;
      }
    })
  }


  ngOnInit(): void {
    this.notebooksSubscription = this.notebookService.notebooksSubject.subscribe((notebooks:Notebook[])=>{
      this.notebooks = notebooks;
    });

    this.notebookIndexSubscription = this.notebookService.currentIndexSubject.subscribe((index:number)=>{
      this.selectedNotebookIndex = index;
    })
  }


  ngOnDestroy(): void {
      this.notebooksSubscription.unsubscribe();
      this.clickListener();
      this.keypressListener();
  }


  onCreateNewNotebook():void{
    this.notebookService.addNotebook(
      new Notebook("New Notebook","",new Date())
    );
    this.notebookService.setCurrentNotebook = this.notebooks.length-1;
    this.newlyCreatedNotebook = true;
  }


  onToggleSidebar():void{
    this.toggleSidebar = !this.toggleSidebar;
  }

  updateBookName():void{
    let name:string = "New Notebook";
    if(!!this.notebookName)
      name = this.notebookName;
    this.notebookService.updateNotebookName(name);
    this.notebookName = "";
  }

  onSetNotebook(currentNotebookIndex: number):void{
    if(this.newlyCreatedNotebook && currentNotebookIndex !== this.selectedNotebookIndex){
      this.updateBookName();
      this.newlyCreatedNotebook = false;
    }
    this.notebookService.setCurrentNotebook = currentNotebookIndex;
  }

}
