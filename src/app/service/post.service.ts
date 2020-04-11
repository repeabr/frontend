import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  criarPost = "http://server-r.herokuapp.com/redesocial/post/criar";
  listaPostPorEmail = "http://server-r.herokuapp.com/redesocial/post/listarPorEmail/";

  constructor(private http: HttpClient) { }

  setPost(post: Post): Observable<any>{
    return this.http.post(this.criarPost, post);
  }

  getPosts(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.listaPostPorEmail + email);
  }
}
