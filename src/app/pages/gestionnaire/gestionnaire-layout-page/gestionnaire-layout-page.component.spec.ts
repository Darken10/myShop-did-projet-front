import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireLayoutPageComponent } from './gestionnaire-layout-page.component';

describe('GestionnaireLayoutPageComponent', () => {
  let component: GestionnaireLayoutPageComponent;
  let fixture: ComponentFixture<GestionnaireLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireLayoutPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
