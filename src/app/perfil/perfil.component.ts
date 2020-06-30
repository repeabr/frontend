import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho, Post } from '../model/model';
import { PessoaService } from '../service/pessoa.service';
import { PostService } from '../service/post.service';
import { ArtigoService } from '../service/artigo.service';
import { AuthenticationService } from '../auth/authentication.service';

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
  artigos = [];
  posts = [];
  
  cientista: boolean;
  dataNascimento: string;
  tempoEmAtividade: string;

  seguir = false;
  seguindo = [];
  seguidores = [];

  temPost = false;
  temArtigo = false;

  verifica = false;

  constructor(private pessoaService: PessoaService, private artigoService: ArtigoService,
    private postService: PostService) {    
  }

  ngOnInit() {
    this.getPessoa();
    this.isCientista();
  }

  isCientista(){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        if (data.curriculo == null) {
          this.verifica = false;
        } else {
          this.verifica = true;
        }
      }
    )
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

        this.getSeguidores(data.id);
        this.getSeguindo(data.id);
        this.verificarFollow(data.id); 
        this.getArtigos();
        this.getPosts();

        this.cientista = this.verificarPessoa();           
      }
    );    
  }

  getPosts(){
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.posts = data;
        if (this.posts.length == 0) {
          this.temPost = false;
        } else {
          this.temPost = true;
        }
      }
    )
  }

  getArtigos(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("emailPerfil"))
    .subscribe(
      data => {
        this.artigos = data;
        if (this.artigos.length == 0) {
          this.temArtigo = false;
        } else {
          this.temArtigo = true;
        }
      }
    )
  }

  getSeguindo(a: any){
    this.pessoaService.getSeguindo(a).subscribe( 
      data => {
        this.seguindo = data;
        console.log(data);
      }      
    );
  }

  getSeguidores(a: any){
    this.pessoaService.getSeguidores(a).subscribe( 
      data => {
        this.seguidores = data;  
        console.log(data);
      }      
    );
  }

  verificarPessoa() {
    if (this.trabalho != null) {
      return true;
    } else {
      return false;
    }    
  }
  
  undoFollow(idSeguindo: number){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoaService.undoFollow(idSeguindo, data).subscribe(
          data => {
            this.seguir = false;
            this.ngOnInit();
          }
        );
      }
    ); 
  }

  follow(idSeguindo: number){
    this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.pessoaService.setFollow(idSeguindo, data).subscribe(
          data => {
            this.seguir = true;
            this.ngOnInit();
          }
        );
      }
    );   
  }

  verificarFollow(idPerfil: number){
    this.pessoaService.
    verificarFollow(+(localStorage.getItem("idUsuario")), idPerfil).
    subscribe(
      data => {
        this.seguir = data;
      }
    );
  }

}
