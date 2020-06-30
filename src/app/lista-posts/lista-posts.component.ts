import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-lista-posts',
  templateUrl: './lista-posts.component.html',
  styleUrls: ['./lista-posts.component.css']
})
export class ListaPostsComponent implements OnInit {

  listaPostPessoa: any;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getListaPost();
  }

  getListaPost(){
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.listaPostPessoa = data;
      }
    );
  }
}