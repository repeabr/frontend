import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from '../model/model';
import { ArtigoService } from '../service/artigo.service';

@Component({
  selector: 'app-artigo-perfil',
  templateUrl: './artigo-perfil.component.html',
  styleUrls: ['./artigo-perfil.component.css']
})
export class ArtigoPerfilComponent implements OnInit {

  @Input() artigo: Artigo;
  status: any;
  

  constructor(private artigoService: ArtigoService) { }

  ngOnInit() {
    this.verificar();
  }

  analiseArtigo(idPostCurtido: number, idPessoaCurtiu: number){
    this.artigoService.analisarArtigo(idPostCurtido, idPessoaCurtiu).subscribe(
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
