import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategdescsComponent } from './categdescs.component';

describe('CategdescsComponent', () => {
  let component: CategdescsComponent;
  let fixture: ComponentFixture<CategdescsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategdescsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategdescsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
