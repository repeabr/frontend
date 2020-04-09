import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/model';
import { PessoaService } from '../service/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  searchText;
  membros: Pessoa[] = [];
  temMembros: boolean;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.getMembros();
  }

  getMembros() {
    this.pessoaService.getListaPessoasExceto(localStorage.getItem("email")).subscribe(
      data => {
        this.membros = data;
        this.temMembros = this.verificarMembros();
      }
    );
  }

  goToPerfil(email: string){
    localStorage.setItem("emailPerfil", email);
    this.router.navigateByUrl("perfil");
  }

  verificarMembros() {
    if (this.membros.length > 0) {
      return true;
    } else {
      return false;
    }    
  }

}
