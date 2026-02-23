import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox-splash',
  standalone: true,
  templateUrl: './checkbox-splash.html',
  styleUrls: ['./checkbox-splash.css']
})
export class CheckboxSplashComponent {

  @Input() checked = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  checkboxId = 'checkbox-splash-' + Math.random().toString(36).substring(2);

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checkedChange.emit(input.checked);
  }
}