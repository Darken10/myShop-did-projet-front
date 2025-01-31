import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireShowRavitaillementComponent } from './gestionnaire-show-ravitaillement.component';

describe('GestionnaireShowRavitaillementComponent', () => {
  let component: GestionnaireShowRavitaillementComponent;
  let fixture: ComponentFixture<GestionnaireShowRavitaillementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireShowRavitaillementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireShowRavitaillementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
