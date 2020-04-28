import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../model/model';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pessoa: Pessoa = new Pessoa();
  p: Pessoa = new Pessoa();
  form: FormGroup;
  msgError = false;

  constructor(private router: Router, private loginService: LoginService, private pessoaService: PessoaService) {
    this.form = new FormGroup({
      email: new FormControl(),
      senha: new FormControl()
    });
    this.pessoa = {
      id: null,
      email: '',
      senha: '',
      curriculo: null,
      formacao: null,
      infos: null,
      interesses: null,
      trabalho: null
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    this.pessoa.email = this.form.get("email").value;
    this.pessoa.senha = this.form.get("senha").value;

    this.loginService.login(this.pessoa).subscribe(
      data => {
        if (data) {          
          localStorage.setItem("email", this.pessoa.email);
          this.pessoaService.getPessoaByEmail(localStorage.getItem("email")).subscribe(
            x => {
              console.log(x);
              localStorage.setItem("idUsuario", x.id.toString());
            }
          )
          this.router.navigateByUrl("");
        } else {        
          this.msgError = true;
        }      
      }
    );
  }

  
}
