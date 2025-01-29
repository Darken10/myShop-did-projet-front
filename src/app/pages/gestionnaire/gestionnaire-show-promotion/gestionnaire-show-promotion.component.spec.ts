import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireShowPromotionComponent } from './gestionnaire-show-promotion.component';

describe('GestionnaireShowPromotionComponent', () => {
  let component: GestionnaireShowPromotionComponent;
  let fixture: ComponentFixture<GestionnaireShowPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireShowPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireShowPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
