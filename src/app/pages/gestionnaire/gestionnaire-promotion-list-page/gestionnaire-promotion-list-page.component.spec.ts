import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnairePromotionListPageComponent } from './gestionnaire-promotion-list-page.component';

describe('GestionnairePromotionListPageComponent', () => {
  let component: GestionnairePromotionListPageComponent;
  let fixture: ComponentFixture<GestionnairePromotionListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnairePromotionListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnairePromotionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
