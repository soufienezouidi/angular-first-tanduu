import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home6footerComponent } from './home6footer.component';

describe('Home6footerComponent', () => {
  let component: Home6footerComponent;
  let fixture: ComponentFixture<Home6footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home6footerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home6footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
