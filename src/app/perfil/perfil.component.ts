import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Curtida, Post, PostPessoa } from '../model/model';
import { PessoaService } from '../service/pessoa.service';
import { PostService } from '../service/post.service';
import { CurtidaService } from '../service/curtida.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();
  info: InfoAdicionais = new InfoAdicionais();
  trabalho: Trabalho = new Trabalho();

  temInteresses: boolean;
  interesses = [];
  
  cientista: boolean;
  dataNascimento: string;
  tempoEmAtividade: string;

  listaPosts = [];
  temPost: boolean;

  curtida: Curtida = new Curtida()

  status = ["Like", "Dislike"];
  listaPostPessoa = [];
  auxPost = new Post();

  constructor(private pessoaService: PessoaService, private postService: PostService
    ,private curtidaService: CurtidaService) {    
  }

  ngOnInit() {
    this.getPessoa(); 
    this.curtir();
  }

  botaoDeCurtir(post: PostPessoa){
    if (post.status === this.status[0]) {
      this.postService.getPostById(post.idDoPost).subscribe(
        data => {
          this.auxPost = data;
          this.auxPost.curtidas++;
          this.curtida.idPostCurtido = post.idDoPost;
          this.curtida.idUsuarioCurtiu = +(localStorage.getItem("idUsuario"));
          this.postService.atualizarPost(this.auxPost).subscribe();
          this.curtidaService.createCurtida(this.curtida).subscribe();  
          this.ngOnInit();   
        }
      )
    } else if (post.status === this.status[1]) {
      this.postService.getPostById(post.idDoPost).subscribe(
        data => {
          this.auxPost = data;
          this.auxPost.curtidas--;
          this.curtida.idPostCurtido = post.idDoPost;
          this.curtida.idUsuarioCurtiu = +(localStorage.getItem("idUsuario"));
          this.postService.atualizarPost(this.auxPost).subscribe();
          this.curtidaService.deleteCurtida(+(localStorage.getItem("idUsuario")),this.auxPost.id).subscribe();
          this.ngOnInit(); 
        }
      )
    }
  }

  curtir(){
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {  
        if (this.listaPostPessoa.length > 0) {
          this.listaPostPessoa.splice(0, data.length);
        }      
        
        for (var i = 0; i < data.length; i++) {
          let postPessoa = new PostPessoa();
          postPessoa.idDoPost = data[i].id;
          postPessoa.publicacao = data[i].publicacao;
          postPessoa.emailAutor = data[i].emailAutor;
          postPessoa.curtidas = data[i].curtidas;
          this.curtidaService.verificarCurtida(+(localStorage.getItem("idUsuario")),  postPessoa.idDoPost)
          .subscribe(
            x => {
              if(!x) {
                postPessoa.status = this.status[0];
              } else {
                postPessoa.status = this.status[1];
              }
            }
          );          
          this.listaPostPessoa.push(postPessoa);
        }
        console.log(this.listaPostPessoa);
        this.temPost = this.verificarPost(); 
      }            
    );
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.pessoa = data;
        
        this.curriculo = data.curriculo;

        this.formacao = data.formacao;

        this.info = data.infos;

        this.trabalho = data.trabalho;
        
        let str = data.infos.dataNascimento;
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.dataNascimento = final.toString();

        let dataInicioCientista = data.infos.dataInicioCientista;
        const now = new Date();
        const past = new Date(dataInicioCientista);
        const dif = Math.abs(now.getTime() - past.getTime());
        const days = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (days < 365) {
          let final2 = Math.floor(days / 30);
          this.tempoEmAtividade = final2.toString() + " mes(es)";
        } else {
          let final2 = Math.floor(days / 365);
          this.tempoEmAtividade = final2.toString() + " ano(s)";
        }

        if (data.interesses == "" || data.interesses == null) {
          this.temInteresses = false;
        } else {
          this.temInteresses = true;
          this.interesses = this.pessoa.interesses.split(",");
        }

        this.cientista = this.verificarPessoa();           
      }
    );    
  }

  verificarPost(){
    if(this.listaPostPessoa.length == 0){
      return false;
    } else {
      return true;
    }
  }

  verificarPessoa() {
    if (this.trabalho != null) {
      return true;
    } else {
      return false;
    }    
  }

}
