import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-action-alert',
  templateUrl: './action-alert.component.html',
  styleUrls: ['./action-alert.component.scss'],
})
export class ActionAlertComponent {
  @Input() message = '';
  @Input() type = '';
  @Input() action = '';
}
