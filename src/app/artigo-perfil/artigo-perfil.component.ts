import { Component, OnInit, Input } from '@angular/core';
import { Artigo } from '../model/model';
import { ArtigoService } from '../service/artigo.service';
import { HttpClient } from '@angular/common/http';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-artigo-perfil',
  templateUrl: './artigo-perfil.component.html',
  styleUrls: ['./artigo-perfil.component.css']
})
export class ArtigoPerfilComponent implements OnInit {

  @Input() artigo: Artigo;
  status: any;
  documento: any;

  constructor(private artigoService: ArtigoService, private httpClient: HttpClient) { }

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
    this.artigoService.buscaArtigoPorId(this.artigo.id).subscribe(
      data => {
        this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (this.artigo.id)).subscribe(
          data => {
            this.documento = data;
            console.log(this.artigo.id);
          }
        );
      }
    );
  }

  botao(idPostCurtido: number){
    if(this.status == "Curtir"){
      this.artigoService.curtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigo = data;
          this.analiseArtigo(this.artigo.id ,+(localStorage.getItem("idUsuario")));
          this.artigoService.buscaArtigoPorId(this.artigo.id).subscribe(
            data => {
              this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (this.artigo.id)).subscribe(
                data => {
                  this.documento = data;
                }
              );
            }
          );
        }
      );
    } else if (this.status == "Descurtir") {
      this.artigoService.undoCurtirArtigo(+(localStorage.getItem("idUsuario")), idPostCurtido).subscribe(
        data => {
          this.artigo = data;
          this.analiseArtigo(this.artigo.id ,+(localStorage.getItem("idUsuario")));
          this.artigoService.buscaArtigoPorId(this.artigo.id).subscribe(
            data => {
              this.httpClient.get('https://server-r.herokuapp.com/redesocial/artigo/arquivo/FiPorArtigo/'+ (this.artigo.id)).subscribe(
                data => {
                  this.documento = data;
                }
              );
            }
          );
        }
      );
    }
  }
}
