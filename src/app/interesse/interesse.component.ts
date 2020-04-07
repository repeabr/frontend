import { Component, OnInit } from '@angular/core';
import { InteresseService } from '../service/interesse.service';
import { Interesse, Pessoa } from '../model/model';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-interesse',
  templateUrl: './interesse.component.html',
  styleUrls: ['./interesse.component.css']
})
export class InteresseComponent implements OnInit {

  emailLogado = localStorage.getItem("email");

  pessoa: Pessoa = new Pessoa();
  interesse: Interesse = new Interesse();
  jaTemInteresse: boolean;

  searchText;
  p: number = 1;
  interesses: Interesse[] = [];

  constructor(private interesseService: InteresseService, private pessoaService: PessoaService) { }

  ngOnInit() {
    this.getInteresse();
    this.getPessoa();
  }

  botao(status: string, interesse: Interesse){
    if(status == "null" || status == "ativo"){
      this.adicionar(interesse);
    } else {
      this.remover(interesse);
    }
  }

  adicionar(interesse: Interesse){       
    this.pessoa.interesses.push(this.interesse);
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
    console.log(this.pessoa);
  }

  remover(interesse: Interesse){
    this.pessoa.interesses = null;
    this.pessoaService.updatePessoa(this.pessoa).subscribe();
  }

  getPessoa(){
    this.pessoaService.getPessoaByEmail(this.emailLogado).subscribe(
      data =>{
        this.pessoa = data;
      }
    )
  }

  getInteresse(){
    this.interesseService.getInteresse().subscribe(
      data => {
        this.interesses = data;
      }
    )
  }

}
