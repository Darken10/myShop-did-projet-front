import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireShowProduitPageComponent } from './gestionnaire-show-produit-page.component';

describe('GestionnaireShowProduitPageComponent', () => {
  let component: GestionnaireShowProduitPageComponent;
  let fixture: ComponentFixture<GestionnaireShowProduitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireShowProduitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireShowProduitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
