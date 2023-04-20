import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import * as TaskActions from '../tasks/tasks.actions';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions<any>,
    private http: HttpService
  ) { }

  fetchTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.tasksLoaded.type),
      switchMap(action => {
        return this.http.getTasks(action.boardId).pipe(
          map(tasks => TaskActions.fetchTasksSuccess({ tasks: tasks })),
          catchError(err => of(TaskActions.fetchTasksFailed({ error: err })))
        );
      })
    );
  });

  addTask$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TaskActions.addTaskFormSubmitted.type),
      switchMap((action): any => {
        return this.http.postTask(action.task, action.id).pipe(
          map(task => TaskActions.addTaskSuccess({ task: task })),
          catchError(err => of(TaskActions.addTaskFailed({ error: err })))
        );
      })
    );
  });

  updateTaskName$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.editTaskNameFormSubmitted),
      switchMap(action => {
        return this.http.updateTask({name: action.name}, +action.id).pipe(
          map(task => TaskActions.editTaskSuccess({ task: task })),
          catchError(err => of(TaskActions.editTaskFailed({ error: err })))
        );
      })
    );
  });
  
  updateTaskStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.editTaskStatusFormSubmitted),
      switchMap(action => {
        return this.http.updateTask({ status: action.status }, +action.id).pipe(
          map(task => TaskActions.editTaskSuccess({ task: task })),
          catchError(err => of(TaskActions.editTaskFailed({ error: err })))
        );
      })
    );
  });
    
  addTaskComment$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TaskActions.addCommentFormSubmited.type),
      switchMap((action): any => {
        return this.http.getTaskById(+action.id).pipe(
          map(task => {
            task.comments.push(action.comment);
            return task;
          })
        );
      }),
      switchMap((task: any): any => {
        return this.http.updateTask({ comments: task.comments }, task.id).pipe(
          map(task => TaskActions.editTaskSuccess({ task: task })),
          catchError(err => of(TaskActions.editTaskFailed({ error: err })))
        );
      })
    );
  });
  
  deleteTaskCommentById$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteCommentFormSubmited.type),
      switchMap((action): any => {
        return this.http.getTaskById(action.taskId).pipe(
          map(task => {
            task.comments.splice(action.id, 1);
            return task;
          })
        );
      }),
      switchMap((task: any): any => {
        return this.http.updateTask({ comments: task.comments }, task.id).pipe(
          map(task => TaskActions.editTaskSuccess({ task: task })),
          catchError(err => of(TaskActions.editTaskFailed({ error: err })))
        );
      })
    );
  });  
  
  deleteTask$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(TaskActions.deleteTaskFormSubmitted.type),
      switchMap((action): any => {
        return this.http.deleteTaskbyId(action.taskId).pipe(
          map(() =>
            TaskActions.deleteTaskSuccess({ taskId: action.taskId })
          ),
          catchError(err => of(TaskActions.deleteTaskFailed({ error: err })))
        );
      })
    );
  });
}
