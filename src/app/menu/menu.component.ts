import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { PessoaService } from '../service/pessoa.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  cientista: any;

  constructor(public authService: AuthenticationService, private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
  }

  
}
