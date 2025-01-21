import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissierDashbordPageComponent } from './caissier-dashbord-page.component';

describe('CaissierDashbordPageComponent', () => {
  let component: CaissierDashbordPageComponent;
  let fixture: ComponentFixture<CaissierDashbordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaissierDashbordPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaissierDashbordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
