import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap, Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { Task } from 'src/app/Task';
import { Comment } from 'src/app/Comment';
import { ColumnComponent } from './column/column.component';
import { nameValidator } from 'src/app/shared/validators/name-valid.directive';
import { Store } from '@ngrx/store';
import { BoardState,deleteBoardInitiated,deleteBoardTasksInitiated, loadBoard } from 'src/app/state/boards';
import * as BoardSelectors from '../../../state/boards/boards.selector';
import * as TaskSelectors from '../../../state/tasks/tasks.selector';
import {
  addCommentFormSubmited,
  addTaskFormSubmitted,
  deleteCommentFormSubmited,
} from 'src/app/state/tasks/tasks.actions';
import { Board } from 'src/app/Board';

@Component({
  selector: 'app-board-details',
  templateUrl: './board-details.component.html',
  styleUrls: ['./board-details.component.scss'],
  providers: [HttpService],
})
  
export class BoardDetailsComponent implements OnInit {
  @ViewChildren(ColumnComponent) columns!: QueryList<ColumnComponent>;

  public boardId!: string;

  public boardId$ = this.activRoute.params
    .pipe(map((params) => params['id']))
    .subscribe((id) => (this.boardId = id));

  public board$!: Observable<Board | undefined>;

  public isBoardInStore$ = this.store$.select(
    BoardSelectors.selectBoardItem(this.boardId)
  );
  
  public task$: any;
    
  public comments$: any;

  public archivedTasks$ = this.store$.select(TaskSelectors.selectArchivedTasks);

  public switchCondition: boolean = true;

  public archivedTasksModal: boolean = false;

  public addTasksModal: boolean = false;

  public commentsModal: boolean = false;

  public addTaskForm!: FormGroup;

  public status: string = '';

  public name: string = '';

  public taskId!: number;

  public archivedTasksTemplate!: TemplateRef<Task>;

  public commentsTemplate!: TemplateRef<Task>;
  
  public commentsLength: number = 0;
  
  public nameFilterValue: any = '';
  
  public sortByValue: any = '';
  
  public sortDirectionValue: string = '';

  constructor(
    private activRoute: ActivatedRoute,
    private store$: Store<BoardState>
  ) { }
  
  ngOnInit(): void {
    this.board$ = this.isBoardInStore$.pipe(
      mergeMap((board): Observable<Board | undefined> => {
        if (!board) {
          this.store$.dispatch(loadBoard({ boardId: this.boardId }));
          return this.store$.select(BoardSelectors.selectBoard);
        }
        return this.store$.select(BoardSelectors.selectBoardItem(this.boardId));
      })
    );    
  }
    
  onNameFilter($event:any) {
    this.nameFilterValue = $event;    
  }
  
  onSortParamsChange($event: any) {
    this.sortByValue = $event;
  }
  
  onSortDirectionChange($event: any) {    
    this.sortDirectionValue = $event;
  }

  showAddTasksModal = (title: string): void => {
    this.addTasksModal = true;
    this.addTaskForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(72),
        nameValidator(/(^\d)/),
      ]),
    });
    this.status = title;
  };

  showArchivedTasksModal() {
    this.archivedTasksModal = true;
  }

  showCommentsModal($event: any) {
    this.commentsModal = true;
    this.taskId = $event;
    this.comments$ = this.store$.select(TaskSelectors.selectTasksCommentsById(this.taskId.toString()));
    this.comments$.pipe(map(comments => comments))
      .subscribe((comments: any) => this.commentsLength = comments.length);
  }

  closeModal() {
    this.archivedTasksModal = false;
    this.addTasksModal = false;
    this.commentsModal = false;
  }

  addTask() {
    if (this.addTaskForm.valid) {
      const task = new Task(this.addTaskForm.value.name, this.status);
      this.store$.dispatch(addTaskFormSubmitted({ task: task, id: this.boardId }));
      this.addTasksModal = false;
      this.columns.forEach(column => column.getTasks());
    } else {
      return;
    }
  }

  addComment(form: NgForm) {
    const comment = new Comment(form.value.name);
    this.store$.dispatch(addCommentFormSubmited({ comment: comment, id: this.taskId.toString() }));
    this.name = '';
  }

  deleteComment($event: any) {
    const index = $event;
    this.store$.dispatch(deleteCommentFormSubmited({ taskId: this.taskId.toString(), id: index.toString() }));
  }

  deleteBoard() {
    this.store$.dispatch(deleteBoardTasksInitiated({ boardId: this.boardId.toString() }));
    this.store$.dispatch(deleteBoardInitiated({ boardId: this.boardId.toString() }));
  }
}
