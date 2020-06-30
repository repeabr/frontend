import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigosPerfilComponent } from './artigos-perfil.component';

describe('ArtigosPerfilComponent', () => {
  let component: ArtigosPerfilComponent;
  let fixture: ComponentFixture<ArtigosPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtigosPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigosPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
