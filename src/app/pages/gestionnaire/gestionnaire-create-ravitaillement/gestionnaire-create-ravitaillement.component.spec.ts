import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireCreateRavitaillementComponent } from './gestionnaire-create-ravitaillement.component';

describe('GestionnaireCreateRavitaillementComponent', () => {
  let component: GestionnaireCreateRavitaillementComponent;
  let fixture: ComponentFixture<GestionnaireCreateRavitaillementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireCreateRavitaillementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireCreateRavitaillementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
