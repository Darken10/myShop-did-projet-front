import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissierProduitListPageComponent } from './caissier-produit-list-page.component';

describe('CaissierProduitListPageComponent', () => {
  let component: CaissierProduitListPageComponent;
  let fixture: ComponentFixture<CaissierProduitListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaissierProduitListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaissierProduitListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
