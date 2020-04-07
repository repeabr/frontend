import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  cadastro = "https://server-r-backend.herokuapp.com/redesocial/pessoa/cadastro";
  verificaLogin = "https://server-r-backend.herokuapp.com/redesocial/pessoa/emailpessoa/";
  listaPessoas = "https://server-r-backend.herokuapp.com/redesocial/pessoa/listar";
  listaPessoasExceto = "https://server-r-backend.herokuapp.com/redesocial/pessoa/listarExceto/";
  atualizaPessoa = "https://server-r-backend.herokuapp.com/redesocial/pessoa/atualizar";

  constructor(private http: HttpClient) { }

  setPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.post<any>(this.cadastro, pessoa);
  }

  getPessoaByEmail(email: string): Observable<Pessoa>{
    return this.http.get<Pessoa>(this.verificaLogin + email);
  }

  getListaPessoas():Observable<any[]>{
    return this.http.get<any[]>(this.listaPessoas);
  }

  getListaPessoasExceto(email: string): Observable<any>{
    return this.http.get<any[]>(this.listaPessoasExceto + email);
  }

  updatePessoa(pessoa: Pessoa): Observable<any>{
    return this.http.put<any>(this.atualizaPessoa, pessoa);
  }
}
