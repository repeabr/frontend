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
  formularioCompleto = false;
  cientista = true;
  comum = false;
  souBrasileiro = false;
  souEstrangeiro = false;
  menorDeIdade = false;

  constructor(private pessoaService: PessoaService, private router: Router) { }

  ngOnInit() {
  }

  brasileiro() {
    this.souBrasileiro = true;
    this.souEstrangeiro = false;
  }

  estrangeiro() {
    this.souBrasileiro = false;
    this.souEstrangeiro = true;
  }

  cadastroCientista() {
    this.cientista = true;
    this.comum = false;
  }

  cadastroComum() {
    this.cientista = false;
    this.comum = true;
  }

  onSubmitCientista() {
    if (this.infos.nomePessoa != null &&
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
      this.formularioCompleto = true;
      this.pessoa.interesses = "";

      this.verificaIdade();

      localStorage.setItem("emailCadastrado", this.pessoa.email);
    }
    if (this.formularioCompleto && !this.menorDeIdade) {
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if (data == null) {
            this.pessoaService.setPessoa(this.pessoa).subscribe(
              data => {
                console.log(this.pessoa);
              }
            );
            this.erro = false;
            this.sucesso = true;
            this.submiter = false;
            this.router.navigateByUrl("/cadastro-interesses");
          } else {
            this.erro = true;
            this.sucesso = false;
          }
        }
      )
    }
  }

  verificaIdade() {
    let dataInicioCientista = this.infos.dataNascimento
    const now = new Date();
    const past = new Date(dataInicioCientista);
    const dif = Math.abs(now.getTime() - past.getTime());
    const days = Math.floor(dif / (1000 * 60 * 60 * 24));

    if (days < 6570) {
      this.menorDeIdade = true;
    } else {
      this.menorDeIdade = false;
    }
  }

  onSubmitComum() {
    if (this.infos.nomePessoa != null &&
      this.pessoa.email != null &&
      this.pessoa.senha != null &&
      this.infos.dataNascimento != null &&
      this.formacao.nivelDeFormacao != null &&
      this.formacao.localDeFormacao != null) {
      this.pessoa.formacao = this.formacao;
      localStorage.setItem("emailCadastrado", this.pessoa.email);

      this.infos.dataInicioCientista = "";
      this.pessoa.infos = this.infos;
      this.pessoa.interesses = "";

      this.curriculo = null;
      this.trabalho = null;

      this.submiter = false;

      this.verificaIdade();
    }
    if (!this.submiter) {
      this.pessoaService.getPessoaByEmail(this.pessoa.email).subscribe(
        data => {
          if (data == null) {
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
