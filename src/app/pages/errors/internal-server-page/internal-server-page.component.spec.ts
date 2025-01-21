import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalServerPageComponent } from './internal-server-page.component';

describe('InternalServerPageComponent', () => {
  let component: InternalServerPageComponent;
  let fixture: ComponentFixture<InternalServerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternalServerPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternalServerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
