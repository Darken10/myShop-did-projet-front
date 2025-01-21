import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionnaireDashbordPageComponent } from './gestionnaire-dashbord-page.component';

describe('GestionnaireDashbordPageComponent', () => {
  let component: GestionnaireDashbordPageComponent;
  let fixture: ComponentFixture<GestionnaireDashbordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionnaireDashbordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionnaireDashbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
