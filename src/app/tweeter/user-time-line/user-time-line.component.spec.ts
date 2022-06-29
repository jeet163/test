import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimeLineComponent } from './user-time-line.component';

describe('UserTimeLineComponent', () => {
  let component: UserTimeLineComponent;
  let fixture: ComponentFixture<UserTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
