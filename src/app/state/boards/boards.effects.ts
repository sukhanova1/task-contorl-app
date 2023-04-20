import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, combineLatest, concat, concatMap, filter, forkJoin, map, mergeMap, Observable, of, switchMap, tap, zip } from 'rxjs';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { HttpService } from '../../services/http.service';
import * as BoardActions from './boards.actions';

@Injectable()
export class BoardEffects {
  constructor(
    private actions$: Actions<any>,
    private http: HttpService,
    private router: Router
  ) { }

  fetchBoards$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.boardsLoaded.type),
      switchMap((action): any => {
        return this.http.getAllBoards().pipe(
          map((boards) => {            
            const filteredBoards = boards.filter(
              (board: Board) => board.user_id === action.user_id.toString()
            );
            return BoardActions.fetchBoardSuccess({ boards: filteredBoards });
          }),
          catchError(err => of(BoardActions.fetchBoardFailed({ error: err })))
        );
      })
    );
  });

  fetchBoardItem$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      mergeMap((action): any => {
        return this.http.getBoardById(+action.boardId).pipe(
          map(board => BoardActions.loadBoardSucsess({ board: board })),
          catchError(err => of(BoardActions.loadBoardFailed({ error: err })))
        );
      })
    );
  });

  addBoard$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.addBoardFormSubmitted.type),
      switchMap((action): any => {
        return this.http.postBoard(action.board).pipe(
          map((board) => BoardActions.addBoardSuccess({ board: board })),
          catchError(err => of(BoardActions.addBoadFailed({ error: err })))
        );
      })
    );
  });

  editBoard$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.editBoardFormSubmitted.type),
      switchMap((action): any => {
        return this.http.patchBoardNameById(action.board).pipe(
          map((board) => BoardActions.editBoardSuccess({ board: board })),
          catchError((err) => of(BoardActions.editBoadFailed({ error: err })))
        );
      })
    );
  });

  editTodoColumnColor$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.editTodoColumnColor),
      switchMap((action): any => {        
        return this.http.patchColumnColorByBoardId({ toDoColumnColor: action.toDoColumnColor }, +action.boardId).pipe(
          map((board) => BoardActions.editBoardSuccess({ board: board })),
          catchError((err) => of(BoardActions.editBoadFailed({ error: err })))
        );
      })
    );
  });
  
  editInProgressColumnColor$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.editInProgressColumnColor),
      switchMap((action): any => {        
        return this.http.patchColumnColorByBoardId({ inProgressColumnColor: action.inProgressColumnColor }, +action.boardId).pipe(
          map((board) => BoardActions.editBoardSuccess({ board: board })),
          catchError((err) => of(BoardActions.editBoadFailed({ error: err })))
        );
      })
    );
  });
  
  editDoneColumnColor$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.editDoneColumnColor),
      switchMap((action): any => {        
        return this.http.patchColumnColorByBoardId({ doneColumnColor: action.doneColumnColor }, +action.boardId).pipe(
          map((board) => BoardActions.editBoardSuccess({ board: board })),
          catchError((err) => of(BoardActions.editBoadFailed({ error: err })))
        );
      })
    );
  });
  
  deleteBoardTasks$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoardTasksInitiated.type),
      switchMap((action: any): any => {    
        return this.http.getTasks(action.boardId).pipe(map(tasks => tasks));
      }),
      mergeMap((tasks: any): any => {        
        return zip(tasks.map((task: Task) => this.http.deleteTaskbyId(+task.id))).pipe(  
          map((() => BoardActions.deleteBoardTasksSuccess()),
          catchError(err => of(BoardActions.deleteBoadTasksFailed({ error: err })))));    
      })
    );
  });
  
  deleteBoard$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(BoardActions.deleteBoardInitiated.type, BoardActions.deleteBoardTasksSuccess),
      switchMap((action: any): any => {
        return this.http.deleteBoardById(action.boardId).pipe(
          tap(() => this.router.navigate(['home', 'dashboard'])),
          map(() => BoardActions.deleteBoardSuccess({ boardId: action.boardId })),
          catchError((err) => of(BoardActions.deleteBoardFailed({ error: err })))
        );
      })
    );

  })
  
}
