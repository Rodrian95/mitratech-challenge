import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAlertComponent } from './action-alert.component';

describe('ActionAlertComponent', () => {
  let component: ActionAlertComponent;
  let fixture: ComponentFixture<ActionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
