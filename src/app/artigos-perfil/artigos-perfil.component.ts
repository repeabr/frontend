import { Component, OnInit } from '@angular/core';
import { ArtigoService } from '../service/artigo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artigos-perfil',
  templateUrl: './artigos-perfil.component.html',
  styleUrls: ['./artigos-perfil.component.css']
})
export class ArtigosPerfilComponent implements OnInit {

  listaArtigo = [];
  temArtigo: boolean = false;
  aux: any;
  mudarArq = false;
  remove: any;

  constructor(private artigoService: ArtigoService, private httpClient: HttpClient) { }

  ngOnInit() {
    this.getListaArtigos();
    console.log(this.listaArtigo);
  }

  getListaArtigos(){    
    let temArquivo: boolean = false;
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.listaArtigo = data.slice(0,10).sort(function (a, b) {	
          return (a.curtidas < b.curtidas) ? 1 : ((b.curtidas < a.curtidas) ? -1 : 0);
        });
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
                    temArquivo = true;
                  }
                  else if (data == null){
                    temArquivo = false;
                  }
                }
              );  
          }        
        }
      }
    );
  }
}
