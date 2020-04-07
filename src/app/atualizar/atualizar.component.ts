import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Interesse, Trabalho } from '../model/model';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  cientista = false;
  atualizado = false;

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();  
  infos: InfoAdicionais = new InfoAdicionais();
  interesses: Interesse[] = [];
  trabalho: Trabalho = new Trabalho();

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getPessoa();
  }

  confirmarAtualizacao(){    
    if(this.infos.nomePessoa != null &&
      this.pessoa.email != null &&
      this.pessoa.senha != null &&
      this.infos.dataNascimento != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null) {  
        this.pessoa.curriculo = this.curriculo;
        this.pessoa.formacao = this.formacao;
        this.pessoa.infos = this.infos;
        this.pessoa.interesses = this.interesses;
        this.pessoa.trabalho = this.trabalho;
        this.atualizado = true;   
    }
    if(this.atualizado){
      this.pessoaService.updatePessoa(this.pessoa).subscribe();
    }
  }

  getPessoa(){
    let email = localStorage.getItem("email");
    this.pessoaService.getPessoaByEmail(email).subscribe(
      data => {
        this.pessoa = data;
        this.curriculo = data.curriculo;
        this.formacao = data.formacao;
        this.infos = data.infos;
        this.interesses = data.interesses;
        this.trabalho = data.trabalho;

        this.cientista = this.verificarPessoa();
      }
    )
    
  }

  verificarPessoa() {
    if (this.pessoa.trabalho != null) {
      return true;
    } else {
      return false;
    }
  }

}
