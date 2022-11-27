import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home1footerComponent } from './home1footer.component';

describe('Home1footerComponent', () => {
  let component: Home1footerComponent;
  let fixture: ComponentFixture<Home1footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home1footerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home1footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
