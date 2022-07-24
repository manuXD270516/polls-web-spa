import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPollsComponent } from './dialog-polls.component';

describe('DialogPollsComponent', () => {
  let component: DialogPollsComponent;
  let fixture: ComponentFixture<DialogPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPollsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
