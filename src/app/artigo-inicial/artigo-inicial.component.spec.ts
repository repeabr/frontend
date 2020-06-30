import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoInicialComponent } from './artigo-inicial.component';

describe('ArtigoInicialComponent', () => {
  let component: ArtigoInicialComponent;
  let fixture: ComponentFixture<ArtigoInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtigoInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigoInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
