import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home7footerComponent } from './home7footer.component';

describe('Home7footerComponent', () => {
  let component: Home7footerComponent;
  let fixture: ComponentFixture<Home7footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home7footerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home7footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
