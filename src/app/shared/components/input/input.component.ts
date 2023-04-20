import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
  
export class InputComponent implements ControlValueAccessor {
  @Input() inputType!: string; 
  
  @Input() parentForm!: FormGroup;
  
  @Input() fieldName!: string;
  
  @Input() type!: string
  
  @Input() placeholder!: string;
  
  @Input() label!: string;  
  
  @Input() name: string = '';
  
  public value!: string;
  
  public changed!: (value: string) => void;
  
  public touched!: () => void;
  
  public isDisabled!: boolean;  
  
  get formField (): FormControl{
    return this.parentForm.get(this.fieldName) as FormControl;
  }
  
  constructor() { }
  
  writeValue(value: any): void {
    this.value = value;
  }
  
  updateChanges() {
    this.changed(this.value);
  }
  
  public onChange(event: Event):void {
    const value: string = (<HTMLInputElement>event.target).value;
    
    this.changed(value);
  }
  
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
