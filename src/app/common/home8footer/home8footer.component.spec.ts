import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home8footerComponent } from './home8footer.component';

describe('Home8footerComponent', () => {
  let component: Home8footerComponent;
  let fixture: ComponentFixture<Home8footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home8footerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home8footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
