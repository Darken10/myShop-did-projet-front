import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseShowCommandePageComponent } from './caisse-show-commande-page.component';

describe('CaisseShowCommandePageComponent', () => {
  let component: CaisseShowCommandePageComponent;
  let fixture: ComponentFixture<CaisseShowCommandePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseShowCommandePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseShowCommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
