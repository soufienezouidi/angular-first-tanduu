import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home4headerComponent } from './home4header.component';

describe('Home4headerComponent', () => {
  let component: Home4headerComponent;
  let fixture: ComponentFixture<Home4headerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home4headerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home4headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
