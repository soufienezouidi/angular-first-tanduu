import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home6headerComponent } from './home6header.component';

describe('Home6headerComponent', () => {
  let component: Home6headerComponent;
  let fixture: ComponentFixture<Home6headerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Home6headerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home6headerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
