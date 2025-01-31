import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireListeRavitaillementComponent } from './gestionnaire-liste-ravitaillement.component';

describe('GestionnaireListeRavitaillementComponent', () => {
  let component: GestionnaireListeRavitaillementComponent;
  let fixture: ComponentFixture<GestionnaireListeRavitaillementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireListeRavitaillementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireListeRavitaillementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
