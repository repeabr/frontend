import { Injectable } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private pessoaService: PessoaService) {
    
  }

  isAuthenticated(): boolean{
    return localStorage.getItem("email") != null;
  }

  isCientista(): boolean{
    return localStorage.getItem("tipoDeUsuario") === "cientista";
  }
}
