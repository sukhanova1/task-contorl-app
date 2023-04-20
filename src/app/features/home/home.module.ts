import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ColumnComponent } from './board-details/column/column.component';
import { TaskComponent } from './board-details/column/task/task.component';
import { CommentComponent } from './board-details/comment/comment.component';
import { ItemComponent } from './dashboard/item/item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardDetailsComponent } from './board-details/board-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    BoardDetailsComponent,
    ItemComponent,
    ColumnComponent,
    TaskComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService],
})
export class HomeModule {}
