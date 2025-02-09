import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowUserPageComponent } from './admin-show-user-page.component';

describe('AdminShowUserPageComponent', () => {
  let component: AdminShowUserPageComponent;
  let fixture: ComponentFixture<AdminShowUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminShowUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
