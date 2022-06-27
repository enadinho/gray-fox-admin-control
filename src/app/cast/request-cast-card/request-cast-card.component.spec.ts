import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCastCardComponent } from './request-cast-card.component';

describe('RequestCastCardComponent', () => {
  let component: RequestCastCardComponent;
  let fixture: ComponentFixture<RequestCastCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCastCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestCastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
