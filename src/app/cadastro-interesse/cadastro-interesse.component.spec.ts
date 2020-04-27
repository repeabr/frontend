import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroInteresseComponent } from './cadastro-interesse.component';

describe('CadastroInteresseComponent', () => {
  let component: CadastroInteresseComponent;
  let fixture: ComponentFixture<CadastroInteresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroInteresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroInteresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
