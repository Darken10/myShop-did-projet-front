import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForbidenPageComponent } from './forbiden-page.component';

describe('ForbidenPageComponent', () => {
  let component: ForbidenPageComponent;
  let fixture: ComponentFixture<ForbidenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbidenPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForbidenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
