import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../model/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  analisaPost = "https://server-r.herokuapp.com/redesocial/post/analisaPost/";
  curtir = "https://server-r.herokuapp.com/redesocial/post/curtir/";
  undoCurtir = "https://server-r.herokuapp.com/redesocial/post/undoCurtir/";

  criarPost = "https://server-r.herokuapp.com/redesocial/post/criar";
  listaPostPorEmail = "https://server-r.herokuapp.com/redesocial/post/listarPorEmail/";
  listarTodosPosts = "https://server-r.herokuapp.com/redesocial/post/listar"

  buscaPostPorId = "https://server-r.herokuapp.com/redesocial/post/listarPorId/";
  editarPost = "https://server-r.herokuapp.com/redesocial/post/editarPost/";
  deletarPost = "https://server-r.herokuapp.com/redesocial/post/deletaPost/";

  constructor(private http: HttpClient) { }

  getPostById(idPost: number): Observable<any>{
    return this.http.get<any>(this.buscaPostPorId + idPost);
  }

  getAllPosts(): Observable<any[]>{
    return this.http.get<any[]>(this.listarTodosPosts);
  }

  setPost(post: Post): Observable<any>{
    return this.http.post(this.criarPost, post);
  }

  getPosts(email: string): Observable<any[]>{
    return this.http.get<any[]>(this.listaPostPorEmail + email);
  }

  removerPost(post: Post): Observable<any>{
    return this.http.delete<any>(this.deletarPost + post.id);
  }

  atualizarPost(post: Post): Observable<any>{
    return this.http.put<any>(this.editarPost, post);
  }

  undoCurtirPost(idPessoaCurtiu: number, idPostCurtido: number): Observable<any>{
    return this.http.get<any>(this.undoCurtir + idPessoaCurtiu + "/" + idPostCurtido);
  }

  curtirPost(idPessoaCurtiu: number, idPostCurtido: number): Observable<any>{
    return this.http.get<any>(this.curtir + idPessoaCurtiu + "/" + idPostCurtido);
  }

  analisarPost(idPost: number, idPessoa: number): Observable<any>{
    return this.http.get<any>(this.analisaPost + idPost + "/" + idPessoa);
  }
}
