import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { PessoaService } from '../service/pessoa.service';
import { Notificacao } from '../model/model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cientista: any;
  listaDeNotificacao = [];
  temNotificacao = false;
  notificacoes = [];

  constructor(public authService: AuthenticationService, private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getNotificacao();
  }

  logout(){
    localStorage.clear();
  }

  getNotificacao(){
    this.pessoaService.getNotificacao(localStorage.getItem("email")).subscribe(
      data => {
        this.listaDeNotificacao = data;
        if(this.listaDeNotificacao.length > 0){
          this.temNotificacao = true;
          for (let i = 0; i < this.listaDeNotificacao.length; i++) {
            if(this.listaDeNotificacao[i].tipoPublicacao != null){              
              let notificacao: Notificacao = new Notificacao();
              notificacao.tipoPublicacao = this.listaDeNotificacao[i].tipoPublicacao;
              notificacao.titulo = this.listaDeNotificacao[i].titulo;
              notificacao.autor = this.listaDeNotificacao[i].autor;
              this.notificacoes.push(notificacao);
            }
          }
        }       
      }
    );
  }
  
}
