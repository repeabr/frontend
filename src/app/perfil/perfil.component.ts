import { Component, OnInit } from '@angular/core';
import { Pessoa, Curriculo, Formacao, InfoAdicionais, Trabalho } from '../model/model';
import { PessoaService } from '../service/pessoa.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();

  curriculo: Curriculo = new Curriculo();
  formacao: Formacao = new Formacao();
  info: InfoAdicionais = new InfoAdicionais();
  trabalho: Trabalho = new Trabalho();

  temInteresses: boolean;
  interesses = [];
  
  cientista: boolean;
  dataNascimento: string;
  tempoEmAtividade: string;

  listaPosts = [];
  temPost: boolean;

  constructor(private pessoaService: PessoaService, private postService: PostService) {
    this.postService.getPosts(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.listaPosts = data;
        console.log(this.listaPosts.length); 
        this.temPost = this.verificarPost();  
      }
    );
  }

  ngOnInit() {
    this.getPessoa();  
  }

  getPessoa() {
    this.pessoaService.getPessoaByEmail(localStorage.getItem("emailPerfil")).subscribe(
      data => {
        this.pessoa = data;
        
        this.curriculo = data.curriculo;

        this.formacao = data.formacao;

        this.info = data.infos;

        this.trabalho = data.trabalho;
        
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

        if (data.interesses == "" || data.interesses == null) {
          this.temInteresses = false;
        } else {
          this.temInteresses = true;
          this.interesses = this.pessoa.interesses.split(",");
        }

        this.cientista = this.verificarPessoa();           
      }
    );    
  }

  verificarPost(){
    if(this.listaPosts.length == 0){
      return false;
    } else {
      return true;
    }
  }

  verificarPessoa() {
    if (this.trabalho != null) {
      return true;
    } else {
      return false;
    }    
  }

}
