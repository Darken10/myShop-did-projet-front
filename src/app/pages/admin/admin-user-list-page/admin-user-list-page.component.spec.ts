import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserLIstPageComponent } from './admin-user-list-page.component';

describe('AdminUserLIstPageComponent', () => {
  let component: AdminUserLIstPageComponent;
  let fixture: ComponentFixture<AdminUserLIstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserLIstPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserLIstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
