import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireCreatePromotionPageComponent } from './gestionnaire-create-promotion-page.component';

describe('GestionnaireCreatePromotionPageComponent', () => {
  let component: GestionnaireCreatePromotionPageComponent;
  let fixture: ComponentFixture<GestionnaireCreatePromotionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireCreatePromotionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireCreatePromotionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
