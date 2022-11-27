import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRegisterComponent } from './askforservice.component';

describe('ChooseRegisterComponent', () => {
  let component: ChooseRegisterComponent;
  let fixture: ComponentFixture<ChooseRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseRegisterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
