import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curtida, Post } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurtidaService {

  constructor(private http: HttpClient) { }

  createCurtida(curtida: Curtida): Observable<any>{
    const url = "https://server-r.herokuapp.com/curtida/createCurtida";
    return this.http.post<any>(url, curtida);
  }

  readCurtidas(): Observable<any[]>{
    const url = "https://server-r.herokuapp.com/curtida/getAllCurtida";
    return this.http.get<any[]>(url);
  }

  readCurtidasById(id: string): Observable<any>{
    const url = "https://server-r.herokuapp.com/curtida/getCurtidaId/";
    return this.http.get<any>(url + id);
  }

  deleteCurtida(post: Post): Observable<any>{
    const url = "https://server-r.herokuapp.com/curtida/removeCurtida/";
    return this.http.delete<any>(url + post.id);
  }

  verificarCurtida(idUsuario: number, idPost: number): Observable<any>{
    const url = "https://server-r.herokuapp.com/curtida/verificaCurtida/";
    return this.http.get<any>(url + idUsuario + "/" + idPost);
  }
}
