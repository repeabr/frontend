import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
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

  analisaArtigo = "https://server-r.herokuapp.com/redesocial/artigo/analisaArtigo/";
  undoCurtir = "https://server-r.herokuapp.com/redesocial/artigo/undoCurtir/";
  curtir = "https://server-r.herokuapp.com/redesocial/artigo/curtir/";


  constructor(private http: HttpClient) { }
  
  analisarArtigo(idArtigoCurtido: number, idPessoaCurtiu: number) : Observable<any>{
    return this.http.get<any>(this.analisaArtigo + idArtigoCurtido + "/" + idPessoaCurtiu);
  }

  undoCurtirArtigo(idPessoaCurtiu: number, idArtigoCurtido: number): Observable<any>{
    return this.http.get<any>(this.undoCurtir + idPessoaCurtiu + "/" + idArtigoCurtido);
  }

  curtirArtigo(idPessoaCurtiu: number, idArtigoCurtido: number): Observable<any>{
    return this.http.get<any>(this.curtir + idPessoaCurtiu + "/" + idArtigoCurtido);
  }

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
