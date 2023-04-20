import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonType!: any;
  
  @Input() title!: string;
  
  @Input() type!: string;
  
  @Input() size?: string;
  
  @Input() isDisabled?: boolean;
  
  @Input() buttonSrc!: string;
  
  @Output() clickEmitter = new EventEmitter<string>();
  
  public getClassName(): string {
    return `${this.type} ${this.size}`
  }
}
