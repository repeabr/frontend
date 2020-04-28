import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho } from '../model/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();  
  infos: InfoAdicionais = new InfoAdicionais();
  trabalho: Trabalho = new Trabalho();

  sucesso = false;
  erro = false;
  submiter = true;
  cientista = true;
  comum = false;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
    console.log(this.submiter);
  }
  
  cadastroCientista(){
    this.cientista = true;
    this.comum = false;
  }

  cadastroComum(){
    this.cientista = false;
    this.comum = true;
  }

  onSubmitCientista(){    
    if(this.infos.nomePessoa != null &&
      this.pessoa.email != null &&
      this.pessoa.senha != null &&
      this.infos.dataNascimento != null &&
      this.infos.dataInicioCientista != null &&
      this.trabalho.cidadeOndeTrabalha != null &&
      this.trabalho.estadoOndeTrabalha != null &&
      this.trabalho.nomeInstituicao != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null &&
      this.curriculo.link != null) {
        this.pessoa.curriculo = this.curriculo;
        this.pessoa.formacao = this.formacao;
        this.pessoa.infos = this.infos;
        this.pessoa.trabalho = this.trabalho;
        this.submiter = false;   
        
        console.log(this.pessoa.email);

        localStorage.setItem("emailCadastrado", this.pessoa.email);
        console.log(localStorage.getItem("emailCadastrado"));
    }
    if(!this.submiter){
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if(data == null){
            this.pessoaService.setPessoa(this.pessoa).subscribe(
              data => {
                console.log(this.pessoa);
              }
            );
            this.erro = false;
            this.sucesso = true;
            this.router.navigateByUrl("/cadastro-interesses");
          } else {
            this.erro = true;
            this.sucesso = false;
          }
        }
      )
    }
  }

  onSubmitComum(){  
    if(this.infos.nomePessoa != null &&
      this.pessoa.email != null &&
      this.pessoa.senha != null &&
      this.infos.dataNascimento != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null) {        
        this.pessoa.formacao = this.formacao;
        console.log(this.pessoa.email);
        localStorage.setItem("emailCadastrado", this.pessoa.email);
        console.log(localStorage.getItem("emailCadastrado"));

        this.infos.dataInicioCientista = "";
        this.pessoa.infos = this.infos;

        this.curriculo = null;
        this.trabalho = null;

        this.submiter = false; 
    }
    if(!this.submiter){
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if(data == null){
            this.pessoaService.setPessoa(this.pessoa).subscribe(
              data => {
                console.log(this.pessoa);
              }
            );
            this.erro = false;
            this.sucesso = true;
            this.router.navigateByUrl("/cadastro-interesses");
          } else {
            this.erro = true;
            this.sucesso = false;
          }
        }
      )
    }
  }

  
}
