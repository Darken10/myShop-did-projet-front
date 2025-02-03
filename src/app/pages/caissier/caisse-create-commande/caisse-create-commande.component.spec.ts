import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseCreateCommandeComponent } from './caisse-create-commande.component';

describe('CaisseCreateCommandeComponent', () => {
  let component: CaisseCreateCommandeComponent;
  let fixture: ComponentFixture<CaisseCreateCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseCreateCommandeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseCreateCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
