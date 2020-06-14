import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artigo } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtigoService {
  
  createArtigo = "https://server-r.herokuapp.com/redesocial/artigo/criaArtigo/";
  readAllArtigoByEmail = "https://server-r.herokuapp.com/redesocial/artigo/listaPorEmail/";
  readByIdArtigo = "https://server-r.herokuapp.com/redesocial/artigo/procuraArtigoPorId/";
  updateArtigo = "https://server-r.herokuapp.com/redesocial/artigo/atualizaArtigo";
  deleteArtigo = "https://server-r.herokuapp.com/redesocial/artigo/deletaArtigo/";

  constructor(private http: HttpClient) { }

  criaArtigo(artigo: Artigo): Observable<any>{
    return this.http.post<any>(this.createArtigo, artigo);
  }

  buscaArtigoPorEmail(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.readAllArtigoByEmail + email);
  }

  buscaArtigoPorId(id:number): Observable<any>{
    return this.http.get<any>(this.readByIdArtigo + id);
  }

  atualizaArtigo(artigo: Artigo): Observable<any>{
    return this.http.put<any>(this.updateArtigo, artigo);
  }

  removeArtigo(artigo: Artigo): Observable<any>{
    return this.http.delete<any>(this.deleteArtigo + artigo.id);
  }
}
