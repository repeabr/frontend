import { Component, OnInit } from '@angular/core';
import { PostService } from '../service/post.service';
import { PessoaService } from '../service/pessoa.service';
import { Post, Publicacao } from '../model/model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  listaPosts = [];

  temPost: boolean = true;

  post: Post = new Post();
  publicacao: Publicacao = new Publicacao();

  auxPost: Post = new Post();
  auxPublicacao: Publicacao = new Publicacao();


  constructor(private postService: PostService, private pessoaService: PessoaService) { 
    this.postService.getPosts(localStorage.getItem("email")).subscribe(
      data => {
        this.listaPosts = data.reverse();
        if(data.length == 0){
          this.temPost = false;
        } else {
          this.temPost = true;
        }
      }
    );
  }

  ngOnInit() {
  }

  getPost(post: Post){
    this.postService.getPostById(post.id).subscribe(
      data => {
        this.auxPublicacao = data.publicacao;
        this.auxPost = data;
      }
    );
  }

  editar(){
    this.postService.atualizarPost(this.auxPost).subscribe(
      data => {
        this.postService.getPosts(localStorage.getItem("email")).subscribe(
          x => {
            this.listaPosts = x;
            if(data.length == 0){
              this.temPost = false;
            } else {
              this.temPost = true;
            }
          }
        );
      }
    );
  }

  excluir(){
    this.postService.removerPost(this.auxPost).subscribe(
      data => {
        if(data){
          this.postService.getPosts(localStorage.getItem("email")).subscribe(
            x => {
              this.listaPosts = x;
              if(data.length == 0){
                this.temPost = false;
              } else {
                this.temPost = true;
              }
            }
          );
        }
        this.postService.getPosts(localStorage.getItem("email")).subscribe(
          data => {
            this.listaPosts = data.reverse();
            if(data.length == 0){
              this.temPost = false;
            } else {
              this.temPost = true;
            }
          }
        );
      }
    );
  }

  onSubmit(){
    if (this.post.txt != "" && this.post.txt != null) {
      this.post.curtidas = 0;
      this.post.emailAutor = localStorage.getItem("email");
      
      this.postService.setPost(this.post).subscribe(
        data => {
          this.listaPosts.push(data);
          if(data.length == 0){
            this.temPost = false;
          } else {
            this.temPost = true;
          }
          this.post.txt = "";
        }
      );
  }
  }

}
