import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweeterComponent } from './tweeter.component';

describe('TweeterComponent', () => {
  let component: TweeterComponent;
  let fixture: ComponentFixture<TweeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweeterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
