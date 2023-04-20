import { Directive, HostListener, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { editDoneColumnColor, editInProgressColumnColor, editTodoColumnColor } from 'src/app/state/boards';

@Directive({
  selector: '[appColumnColor]'
})
  
export class ColumnColorDirective {
  @Input() color!: string;
  
  @Input() columnTitle!: string;
  
  @Input() boardId!: string;

  constructor(private store$: Store) { }
  
  @HostListener('change', ['$event'])
  private changeColor() {
    if (this.columnTitle === 'ToDo') {
      return this.store$.dispatch(editTodoColumnColor({ toDoColumnColor: this.color, boardId: this.boardId }));
    } 
    
    if (this.columnTitle === 'In Progress') {
      return this.store$.dispatch(editInProgressColumnColor({ inProgressColumnColor: this.color, boardId: this.boardId }));
    }
    
    if (this.columnTitle === 'Done') {
      return this.store$.dispatch(editDoneColumnColor({ doneColumnColor: this.color, boardId: this.boardId }));
    }
  }
}
