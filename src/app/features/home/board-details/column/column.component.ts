import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { editTaskStatusFormSubmitted, tasksLoaded } from 'src/app/state/tasks/tasks.actions';
import * as TaskSelectors from '../../../../state/tasks/tasks.selector'
import * as BoardSelectors from '../../../../state/boards/boards.selector';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  
  @Input() title!: string;

  @Input() addModal!: (title: string) => void;

  @Input() boardId!: string;
    
  @Input() nameFilterValue: any;
  
  @Input() sortByValue: any;
  
  @Input() sortDirectionValue: any;

  @Output() handleClick = new EventEmitter();  
  
  public tasks$: any; 

  public columnColor!: string;
  
  constructor(public httpService: HttpService, private store$: Store, private elemRef: ElementRef) { }

  ngOnInit(): void {
    this.tasks$ = this.store$.select(TaskSelectors.selectTasksByStatus(this.title));
    this.getTasks();
    
    this.store$.select(BoardSelectors.selectBoardItem(this.boardId))
      .pipe(map(board => board))
      .subscribe((board: any) => {
        if (!board) {
          this.store$.select(BoardSelectors.selectBoard)
            .pipe(map(board => board)).subscribe(board => this.setBackgroundColor(board));
        }
        this.setBackgroundColor(board);
    });
  }
  
  getTasks() {
    this.store$.dispatch(tasksLoaded({ boardId: this.boardId}));
  }

  showComments($event: any) {
    this.handleClick.emit($event);
  }
  
  setBackgroundColor(board:any) {
    const column = this.elemRef.nativeElement.children[0].children[1];
      if (this.title === 'ToDo') {
        column.style.backgroundColor = board.toDoColumnColor;
      }
      
      if (this.title === 'In Progress') {
        column.style.backgroundColor = board.inProgressColumnColor;
      }
      
      if (this.title === 'Done') {
        column.style.backgroundColor = board.doneColumnColor;
      }
  }

  onDragStart(e: any, taskStatus: string, taskId: number) {
    e.dataTransfer.setData('status', taskStatus);
    e.dataTransfer.setData('id', taskId);
  }
  
  onDrop(e: any, columnStatus: string) {
    let elStatus = e.dataTransfer.getData('status');
    let elId = e.dataTransfer.getData('id');

    if (elStatus !== columnStatus) {        
      this.store$.dispatch(editTaskStatusFormSubmitted({ status: columnStatus, id: elId }));         
    } 
  }
  
  onDragOver(e: any) {
    e.preventDefault();
  }
  
  onDragEnd(e:any) {
    e.preventDefault();
  }
}

