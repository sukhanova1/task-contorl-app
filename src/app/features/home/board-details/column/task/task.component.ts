import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/services/http.service';
import {
  deleteTaskFormSubmitted,
  editTaskNameFormSubmitted, editTaskStatusFormSubmitted,
} from 'src/app/state/tasks/tasks.actions';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
  
export class TaskComponent {
  @Input() task!: any;

  @Output() handleClick = new EventEmitter();

  public taskEditActive: boolean = false;

  public comments: boolean = true;

  public name: string = '';

  constructor(public httpService: HttpService, private store$: Store) {}

  showEditTaskForm() {
    this.taskEditActive = !this.taskEditActive;
  }

  editTask(form: NgForm) {
    const name = form.value.name;
    this.store$.dispatch(
      editTaskNameFormSubmitted({ name: name, id: this.task.id })
    );
  }

  showComments() {
    this.handleClick.emit(this.task.id);
  }

  archiveTask() {
    this.store$.dispatch(
      editTaskStatusFormSubmitted({ status: 'Archived', id: this.task.id })
    );
  }

  deleteTask() {
    this.store$.dispatch(deleteTaskFormSubmitted({ taskId: this.task.id }));
  }
}
