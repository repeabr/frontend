import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../service/pessoa.service';
import { Pessoa, InfoAdicionais, Curriculo, Formacao, Interesse, Trabalho } from '../model/model';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  email = localStorage.getItem("email");
  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();
  infos: InfoAdicionais = new InfoAdicionais();
  interesses: Interesse[] = [];
  trabalho: Trabalho = new Trabalho();
  
  cientista: boolean;
  dataNascimento: string;
  tempoEmAtividade: string;

  constructor(private pessoaService: PessoaService) {
  }

  ngOnInit() {
    this.getPessoa();
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(this.email).subscribe(
      data => {
        this.pessoa = data;

        this.curriculo.link = data.curriculo.link;

        this.formacao.nivelDeFormacao = data.formacao.nivelDeFormacao;
        this.formacao.localDeFormacao = data.formacao.localDeFormacao;

        this.infos.nomePessoa = data.infos.nomePessoa;
        this.infos.dataNascimento = data.infos.dataNascimento;
        this.infos.dataInicioCientista = data.infos.dataInicioCientista;
        this.infos.cpf = data.infos.cpf;

        this.trabalho.nomeInstituicao = data.trabalho.nomeInstituicao;
        this.trabalho.cidadeOndeTrabalha = data.trabalho.cidadeOndeTrabalha;
        this.trabalho.estadoOndeTrabalha = data.trabalho.estadoOndeTrabalha;

        let str = data.infos.dataNascimento;
        let array = str.split("-");
        let final = array[2] + "/" + array[1] + "/" + array[0];
        this.dataNascimento = final.toString();

        let dataInicioCientista = data.infos.dataInicioCientista;
        const now = new Date();
        const past = new Date(dataInicioCientista);
        const dif = Math.abs(now.getTime() - past.getTime());
        const days = Math.floor(dif / (1000 * 60 * 60 * 24));

        if (days < 365) {
          let final2 = Math.floor(days / 30);
          this.tempoEmAtividade = final2.toString() + " mes(es)";
        } else {
          let final2 = Math.floor(days / 365);
          this.tempoEmAtividade = final2.toString() + " ano(s)";
        }

        this.cientista = this.verificarPessoa();
      }
    );
  }

  verificarPessoa() {
    if (this.pessoa.trabalho != null) {
      return true;
    } else {
      return false;
    }
  }

}
