import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTimeLineComponent } from './home-time-line.component';

describe('HomeTimeLineComponent', () => {
  let component: HomeTimeLineComponent;
  let fixture: ComponentFixture<HomeTimeLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTimeLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTimeLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
