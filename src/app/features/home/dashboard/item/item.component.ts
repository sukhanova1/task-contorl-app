import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import {
  deleteBoardInitiated,
  deleteBoardTasksInitiated,
  editBoardFormSubmitted,
} from 'src/app/state/boards';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
  
export class ItemComponent implements OnInit {
  @Input() board: any;

  public name: string = '';

  public todo: Task[] = [];
  
  public inProgress: Task[] = [];
  
  public done: Task[] =[];

  constructor(private store$: Store, private http: HttpService) { }
  
  ngOnInit(): void {
    this.getTasksDetails();    
  }

  onSubmit(form: NgForm) {
    this.store$.dispatch(
      editBoardFormSubmitted({
        board: {
          name: form.value.name,
          id: this.board.id,
        },
      })
    );
  }

  deleteBoard() {
    this.store$.dispatch(deleteBoardTasksInitiated({ boardId: this.board.id.toString() }));
    this.store$.dispatch(deleteBoardInitiated({ boardId: this.board.id.toString() }));
  }
  
  getTasksDetails() {
    this.http.getTasks(this.board.id)
      .subscribe(tasks => {
        tasks.forEach(task => {
          if (task.status === 'ToDo') {
            this.todo.push(task);
          }
          if (task.status === 'In Progress') {
            this.inProgress.push(task);
          }
          if (task.status === 'Done') {
            this.done.push(task);
          }
        })
      })
  }
}
