import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home8headerComponent } from './home8header.component';

describe('Home8headerComponent', () => {
  let component: Home8headerComponent;
  let fixture: ComponentFixture<Home8headerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home8headerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home8headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
