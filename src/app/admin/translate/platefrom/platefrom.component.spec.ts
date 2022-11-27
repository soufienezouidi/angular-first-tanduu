import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatefromComponent } from './platefrom.component';

describe('PlatefromComponent', () => {
  let component: PlatefromComponent;
  let fixture: ComponentFixture<PlatefromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatefromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatefromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
