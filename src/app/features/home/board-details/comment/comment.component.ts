import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  
  @Input() comment: any;
  
  @Input() index!: number;
  
  @Output() delete: EventEmitter<any> = new EventEmitter(); 
  
  deleteComment() {
    this.delete.emit(this.index);
  }
}
