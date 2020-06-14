import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  cadastro = "https://server-r.herokuapp.com/redesocial/pessoa/cadastro";
  verificaLogin = "https://server-r.herokuapp.com/redesocial/pessoa/emailpessoa/";
  listaPessoas = "https://server-r.herokuapp.com/redesocial/pessoa/listar";
  listaPessoasExceto = "https://server-r.herokuapp.com/redesocial/pessoa/listarExceto/";
  atualizaPessoa = "https://server-r.herokuapp.com/redesocial/pessoa/atualizar";

  seguindo = "https://server-r.herokuapp.com/redesocial/pessoa/seguindo/";
  seguidores = "https://server-r.herokuapp.com/redesocial/pessoa/seguidores/";
  follow = "https://server-r.herokuapp.com/redesocial/pessoa/follow/";
  unfollow = "https://server-r.herokuapp.com/redesocial/pessoa/unfollow/"
  verificaFollow = "https://server-r.herokuapp.com/redesocial/pessoa/verificaFollow/"

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
  
  getSeguindo(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seguindo + id);
  }

  getSeguidores(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seguidores + id);
  }

  setFollow(idSeguindo: number, pessoa: Pessoa): Observable<any>{
    return this.http.get<any>(this.follow + pessoa.id + "/" + idSeguindo);
  }

  undoFollow(idSeguindo: number, pessoa: Pessoa): Observable<any>{
    return this.http.get<any>(this.unfollow + pessoa.id + "/" + idSeguindo);
  }

  verificarFollow(id: number, idASeguir: number): Observable<any>{
    return this.http.get<any>(this.verificaFollow + id + "/" + idASeguir);
  }
}
