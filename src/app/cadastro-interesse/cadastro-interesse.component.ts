import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/model';
import { InteresseService } from '../service/interesse.service';
import { PessoaService } from '../service/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-interesse',
  templateUrl: './cadastro-interesse.component.html',
  styleUrls: ['./cadastro-interesse.component.css']
})
export class CadastroInteresseComponent implements OnInit {
  searchTextz;
  p: number = 1;

  pessoa: Pessoa = new Pessoa();

  glossarios = [];
  selecionados = [];
  interesses = [];

  jaTemInteresse: boolean = true;

  constructor(private interesseService: InteresseService, private pessoaService: PessoaService, private router: Router) {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailCadastrado")).subscribe(
      data => {
        this.pessoa = data;
        if(this.pessoa.interesses != null){
          this.selecionados = data.interesses.split(",")
          if (this.pessoa.interesses == "" || data.interesses == null) {
            this.jaTemInteresse = true;
          } else {
            this.jaTemInteresse = false;
            this.interesses = this.pessoa.interesses.split(",");
          }
        }        
      }
    )

    this.interesseService.getInteresse().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var contem = false;
          for (let j = 0; j < this.interesses.length; j++) {
            if (data[i].nome == this.interesses[j]) {
              contem = true;
            }
          }
          if (contem == false) {
            this.glossarios.push(data[i].nome);
          }
        }
      }
    )
  }

  finalizar(){
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailCadastrado")).subscribe(
      data => {
        this.pessoa = data;
        if(data.interesses != null && data.interesses != ""){
          this.selecionados = data.interesses.split(",");
          this.jaTemInteresse = false;
          this.interesses = this.pessoa.interesses.split(",");
        } 
        else if (data.interesses == "" || data.interesses == null) {
          this.jaTemInteresse = true;
        } 
      }
    )
  }

  adicionar(i: any) {    
    this.jaTemInteresse = true;
    this.selecionados.push(i);
    if (this.selecionados[0] === "") {
      this.selecionados.splice(this.selecionados.indexOf(''),1);
    }
    
    this.pessoa.interesses = this.selecionados.toString();
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
    this.glossarios.splice(this.glossarios.indexOf(i),1);

    this.jaTemInteresse = false;
  }

  remover(i: any) {
    let array = this.pessoa.interesses.split(",");
    array.splice(array.indexOf(i), 1);
    this.pessoa.interesses = array.toString();
    
    this.glossarios.unshift(i); 
    this.pessoaService.updatePessoa(this.pessoa).subscribe(); 
    this.selecionados.splice(this.selecionados.indexOf(i),1);
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailCadastrado")).subscribe(
      data => {
        this.pessoa = data;
        this.selecionados = data.interesses.split(",")
        if (data.interesses == "" || data.interesses == null) {
          this.jaTemInteresse = true;
        } else {
          this.jaTemInteresse = false;
          this.interesses = this.pessoa.interesses.split(",");
        }
      }
    )

    this.interesseService.getInteresse().subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          var contem = false;
          for (let j = 0; j < this.interesses.length; j++) {
            if (data[i].nome == this.interesses[j]) {
              contem = true;
            }
          }
          if (contem == false) {
            this.glossarios.push(data[i].nome);
          }
        }
      }
    )
  }

}
