import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissierLayoutPageComponent } from './caissier-layout-page.component';

describe('CaissierLayoutPageComponent', () => {
  let component: CaissierLayoutPageComponent;
  let fixture: ComponentFixture<CaissierLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaissierLayoutPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaissierLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
