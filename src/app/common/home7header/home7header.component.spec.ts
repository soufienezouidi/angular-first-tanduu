import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home7headerComponent } from './home7header.component';

describe('Home7headerComponent', () => {
  let component: Home7headerComponent;
  let fixture: ComponentFixture<Home7headerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home7headerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home7headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
