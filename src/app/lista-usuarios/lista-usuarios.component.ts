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

  membros: Pessoa[];  

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    this.getMembros();
  }

  getMembros() {
    this.pessoaService.getListaPessoasExceto(localStorage.getItem("email")).subscribe(
      data => {
        this.membros = data;
      }
    );
  }

  goToPerfil(email: string){
    localStorage.setItem("emailPerfil", email);
    this.router.navigateByUrl("perfil")
  }

}
