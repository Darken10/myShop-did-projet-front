import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveAccountPasswordPageComponent } from './active-account-password-page.component';

describe('ActiveAccountPasswordPageComponent', () => {
  let component: ActiveAccountPasswordPageComponent;
  let fixture: ComponentFixture<ActiveAccountPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveAccountPasswordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveAccountPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
