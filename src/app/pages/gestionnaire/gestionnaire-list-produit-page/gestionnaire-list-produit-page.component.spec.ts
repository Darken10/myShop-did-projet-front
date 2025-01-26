import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireListProduitPageComponent } from './gestionnaire-list-produit-page.component';

describe('GestionnaireListProduitPageComponent', () => {
  let component: GestionnaireListProduitPageComponent;
  let fixture: ComponentFixture<GestionnaireListProduitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireListProduitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireListProduitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
