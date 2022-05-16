import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InActiveCastComponent } from './in-active-cast.component';

describe('InActiveCastComponent', () => {
  let component: InActiveCastComponent;
  let fixture: ComponentFixture<InActiveCastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InActiveCastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InActiveCastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
