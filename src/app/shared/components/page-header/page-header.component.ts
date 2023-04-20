import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as authSelectors from '../../../state/user/user.selector';

import { logoutInitiated } from 'src/app/state/user';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() pageTitle!: string;
  
  @Output() nameFilter = new EventEmitter<any>();
  
  @Output() sortBy = new EventEmitter<any>();
  
  @Output() sortASC = new EventEmitter<any>();
  
  @Output() sortDESC = new EventEmitter<any>();

  public name!: string;
  
  public sortByParams: string = '';

  userName$: Observable<string> = this.store$.select(
    authSelectors.getUserNickName
  );
 
  serverError$: Observable<string> = this.store$.select(authSelectors.selectServerError);

  constructor(private store$: Store) { }
  
  public id: any;
    
  onNameChange(model: any) {    
    this.nameFilter.emit(model);
  }

  onSortParamsChange(model: any) {
    this.sortBy.emit(model);
  }
  
  sortAsc() {
    this.sortASC.emit('asc');
  }
  
  sortDesc() {
    this.sortDESC.emit('desc');
  }

  logout() {
    return this.store$.dispatch(logoutInitiated());
  }
}
