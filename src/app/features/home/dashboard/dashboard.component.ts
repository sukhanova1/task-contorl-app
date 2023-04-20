import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../../Board';
import { nameValidator } from 'src/app/shared/validators/name-valid.directive';
import { Store } from '@ngrx/store';
import * as BoardsSelector from 'src/app/state/boards/boards.selector';
import * as AuthSelectors from 'src/app/state/user/user.selector';
import { addBoardFormSubmitted, boardsLoaded } from 'src/app/state/boards';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  
  public pageTitle: string = 'dashboard';
  
  public createBoardForm!: FormGroup;
  
  public userId!: number; 

  public boards$: Observable<Board[]> = this.store$.select(
    BoardsSelector.selectBoardItems
  );

  public user_id$ = this.store$.select(AuthSelectors.getUserId).subscribe(id => this.userId = id);

  public modalActive: boolean = false;
  
  public nameFilterValue: any = '';
  
  public sortByValue: string = '';
  
  public sortDirectionValue: string = '';
  
  constructor(private store$: Store) {
  }

  ngOnInit(): void {
    this.store$.dispatch(boardsLoaded({ user_id: this.userId })); 
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

  showModal() {
    this.modalActive = true;
    this.createBoardForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(72),
        nameValidator(/(^\d)/),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  closeModal() {
    this.modalActive = false;
  }

  onSubmit() {
    if (this.createBoardForm.valid) {
      const { name, description } = this.createBoardForm.value;
      const board = new Board(name, description, this.userId.toString());

      this.store$.dispatch(addBoardFormSubmitted({ board: board }));
      this.store$.dispatch(boardsLoaded({user_id: this.userId}));
      this.modalActive = false;
    } else {
      return;
    }
  }
}
