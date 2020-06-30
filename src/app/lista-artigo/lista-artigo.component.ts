import { Component, OnInit } from '@angular/core';
import { ArtigoService } from '../service/artigo.service';

@Component({
  selector: 'app-lista-artigo',
  templateUrl: './lista-artigo.component.html',
  styleUrls: ['./lista-artigo.component.css']
})
export class ListaArtigoComponent implements OnInit {

  listaDeArtigo = [];
  temArtigo;

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.getListaPost();
  }

  getListaPost(){
    this.artigoService.buscaArtigoPorEmail(localStorage.getItem("email")).subscribe(
      data => {
        this.listaDeArtigo = data;
        for (let i = 0; i < this.listaDeArtigo.length; i++) {
          if(this.listaDeArtigo[i].curtidas == null) {
            this.listaDeArtigo[i].curtidas = 0;
          }          
        }
        if (this.listaDeArtigo.length == 0) {
          this.temArtigo = false;
        } else if (this.listaDeArtigo.length > 0){
          this.temArtigo = true;
        }
      }
    );
  }
}
