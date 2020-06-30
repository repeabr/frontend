import { Component, OnInit } from '@angular/core';
import { Artigo, Publicacao} from '../model/model';
import { ArtigoService } from '../service/artigo.service';
import { HttpClient } from '@angular/common/http';

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

  aux: any;
  mudarArq = false;
  remove: any;

  constructor(private artigoService: ArtigoService, private httpClient: HttpClient) { }

  public selectedFile;
  public event1;
  imgURL: any;

  ngOnInit() {
    this.getArtigos();
  }

  selecionar(){
    if(!this.mudarArq){
      this.mudarArq = true;
    }
    else if(this.mudarArq){
      this.mudarArq = false;
    }
  }

  onSubmit(){
    if(this.publicacao.anoDaPublicacao != "" 
    && this.publicacao.localDaPublicacao != "" 
    && this.publicacao.titulo != ""
    && this.auxPublicacao.resumo != ""){
      this.artigo.curtidas = 0;
      this.artigo.publicacao = this.publicacao;
      this.artigo.emailAutor = localStorage.getItem("email");

      this.artigoService.criaArtigo(this.artigo).subscribe(
        data => {
          this.publicacao.anoDaPublicacao = "";
          this.publicacao.localDaPublicacao = "";
          this.publicacao.tags = "";
          this.publicacao.titulo = "";
          this.publicacao.url = "";
          this.publicacao.resumo = "";
          this.onUpload(data);

          this.getArtigos();
        }
      );      
    }    
  }

  public onFileChanged(event){
    this.selectedFile = event.target.files[0];   
  }

  onUpload(artigo: any) {
    if(this.selectedFile != null){
      const uploadData = new FormData();
      uploadData.append('myFile', this.selectedFile, this.selectedFile.nome);
      
      this.httpClient.post('https://server-r.herokuapp.com/redesocial/artigo/arquivo/save/'+ artigo.id, uploadData)
      .subscribe(); 
    } 
   }

  getArtigos(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaArtigo = data.reverse();
        if(this.listaArtigo.length == 0) {
          this.temArtigo = false;
        }
        else {
          this.temArtigo = true;
          for (let i = 0; i < this.listaArtigo.length; i++) {
            if(this.listaArtigo[i].publicacao.tags != "" && this.listaArtigo[i].publicacao.tags != null){              
              this.listaArtigo[i].listaTags = this.listaArtigo[i].publicacao.tags.split(",");              
            }
            this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (this.listaArtigo[i].id))
              .subscribe(
                data => {
                  if(data != null){
                    this.aux = data; 
                    this.listaArtigo[i].docName = this.aux.docName;
                  }
                }
              );  
          }        
        }
      }
    )
  }

  getArtigo(artigo: Artigo){    
    this.artigoService.buscaArtigoPorId(artigo.id).subscribe(
      data => {
        this.auxArtigo = data;
        this.auxPublicacao = data.publicacao;
        this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (artigo.id))
              .subscribe(
                data => {
                  if(data != null){
                    this.aux = data;
                  }
                  
                }
              );
      }
    )
  }

  editar(){
    if(this.auxPublicacao.anoDaPublicacao != ""
    && this.auxPublicacao.localDaPublicacao != "" 
    && this.auxPublicacao.titulo != ""
    && this.auxPublicacao.resumo != ""){       
      this.auxArtigo.publicacao = this.auxPublicacao;

      this.artigoService.atualizaArtigo(this.auxArtigo).subscribe(
        data =>{          
          if(this.mudarArq){
            this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (this.auxArtigo.id))
              .subscribe(
                data => {
                  this.remove = data;
                  this.httpClient.delete('https://server-r.herokuapp.com/redesocial/artigo/arquivo/removePorId/'+ this.remove.id)
                  .subscribe(
                    data=> {
                      this.getArtigos();
                      this.mudarArq = false;
                    }
                  );
                }
              );            
          }
          this.getArtigos();
          this.onUpload(data);
        }
      );
    }      
  }

  excluir(){
    console.log(this.auxArtigo)
    this.artigoService.removeArtigo(this.auxArtigo).subscribe(
      data => {
        this.getArtigos();
      }
    );
  }
}
