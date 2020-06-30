import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from '../model/model';
import { ArtigoService } from '../service/artigo.service';

@Component({
  selector: 'app-artigo-inicial',
  templateUrl: './artigo-inicial.component.html',
  styleUrls: ['./artigo-inicial.component.css']
})
export class ArtigoInicialComponent implements OnInit {

  @Input() artigo: Artigo; 

  status: any;

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.verificar();
  }

  analiseArtigo(idArtigoCurtido: number, idPessoaCurtiu: number){
    this.artigoService.analisarArtigo(idArtigoCurtido, idPessoaCurtiu).subscribe(
      data => {
        if(data){
          this.status = "Descurtir";
        } else {
          this.status = "Curtir";
        }
      }
    )
  }

  verificar(){
    this.analiseArtigo(this.artigo.id, +(localStorage.getItem("idUsuario")));
  }

  botao(idPostCurtido: number){
    if(this.status == "Curtir"){
      this.artigoService.curtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigo = data;
          this.analiseArtigo(this.artigo.id ,+(localStorage.getItem("idUsuario")));
        }
      );
    } else if (this.status == "Descurtir") {
      this.artigoService.undoCurtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigo = data;
          this.analiseArtigo(this.artigo.id ,+(localStorage.getItem("idUsuario")));
        }
      );
    }
  }

}
