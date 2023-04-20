import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule } from '@angular/forms';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ColumnColorDirective } from './directives/column-color.directive';
import { NameFilterPipe } from './pipes/name-filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    PageHeaderComponent,
    ColumnColorDirective,
    NameFilterPipe,
    SortPipe,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    ButtonComponent,
    InputComponent,
    PageHeaderComponent,
    ColumnColorDirective,
    NameFilterPipe,
    SortPipe,
  ],
})
export class SharedModule {}
