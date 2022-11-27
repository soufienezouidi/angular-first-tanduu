import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1headerComponent } from './home1header.component';

describe('Home1headerComponent', () => {
  let component: Home1headerComponent;
  let fixture: ComponentFixture<Home1headerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home1headerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
