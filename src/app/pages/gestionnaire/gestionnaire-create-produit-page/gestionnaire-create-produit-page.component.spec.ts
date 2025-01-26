import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireCreateProduitPageComponent } from './gestionnaire-create-produit-page.component';

describe('GestionnaireCreateProduitPageComponent', () => {
  let component: GestionnaireCreateProduitPageComponent;
  let fixture: ComponentFixture<GestionnaireCreateProduitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireCreateProduitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireCreateProduitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
