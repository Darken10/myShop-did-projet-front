import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseCommandeListPageComponent } from './caisse-commande-list-page.component';

describe('CaisseCommandeListPageComponent', () => {
  let component: CaisseCommandeListPageComponent;
  let fixture: ComponentFixture<CaisseCommandeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseCommandeListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseCommandeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
