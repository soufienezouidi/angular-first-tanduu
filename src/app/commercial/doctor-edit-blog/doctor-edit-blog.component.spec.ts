import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditBlogComponent } from './doctor-edit-blog.component';

describe('DoctorEditBlogComponent', () => {
  let component: DoctorEditBlogComponent;
  let fixture: ComponentFixture<DoctorEditBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorEditBlogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorEditBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
