import { Component, OnInit } from '@angular/core';
import { Artigo, Publicacao } from '../model/model';
import { ArtigoService } from '../service/artigo.service';

@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {

  publicacao: Publicacao = new Publicacao();
  auxPublicacao: Publicacao = new Publicacao();

  artigo: Artigo = new Artigo();
  auxArtigo: Artigo = new Artigo();
  temArtigo: boolean = false;

  listaArtigo = [];

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.getArtigos();
  }

  onSubmit(){
    if(this.publicacao.anoDaPublicacao != "" 
    && this.publicacao.localDaPublicacao != "" 
    && this.publicacao.titulo != ""){
      this.artigo.publicacao = this.publicacao;
      this.artigo.emailAutor = localStorage.getItem("email");
      this.artigoService.criaArtigo(this.artigo).subscribe(
        data => {
          this.publicacao.anoDaPublicacao = "";
          this.publicacao.localDaPublicacao = "";
          this.publicacao.tags = "";
          this.publicacao.titulo = "";
          this.publicacao.url = "";
          this.getArtigos();
        }
      );      
    }    
  }

  getArtigos(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaArtigo = data;
        if(this.listaArtigo.length == 0) {
          this.temArtigo = false;
        }
        else {
          this.temArtigo = true;
        }
      }
    )
  }

  getArtigo(artigo: Artigo){
    this.artigoService.buscaArtigoPorId(artigo.id).subscribe(
      data => {
        this.artigo = data;
        this.auxPublicacao = data.publicacao;
      }
    )
  }

  editar(){
    if(this.auxPublicacao.anoDaPublicacao != ""
    && this.auxPublicacao.localDaPublicacao != "" 
    && this.auxPublicacao.titulo != ""){ 
      this.artigo.publicacao = this.auxPublicacao;
      
      this.artigoService.atualizaArtigo(this.artigo).subscribe(
        data =>{
          console.log(data);
          this.getArtigos();
        }
      );
    }  
  }

  excluir(){
    this.artigoService.removeArtigo(this.artigo).subscribe(
      data => {
        console.log(data)
        this.getArtigos();
      }
    );
  }
}
