import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashbordPageComponent } from './admin-dashbord-page.component';

describe('AdminDashbordPageComponent', () => {
  let component: AdminDashbordPageComponent;
  let fixture: ComponentFixture<AdminDashbordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashbordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
