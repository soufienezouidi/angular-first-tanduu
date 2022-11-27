import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home4footerComponent } from './home4footer.component';

describe('Home4footerComponent', () => {
  let component: Home4footerComponent;
  let fixture: ComponentFixture<Home4footerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Home4footerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Home4footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
