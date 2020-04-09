import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../model/model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "https://server-r.herokuapp.com/redesocial/pessoa"

  constructor(private http: HttpClient) { }

  login(email: Pessoa): Observable<any>{
    return this.http.post<any>(this.url  + "/login", email)
    .pipe(map(data =>{
      if (data != null){
        localStorage.setItem("email", email.email);
        return true;
      }
      return false;
    }))
  }

  getPessoaByEmail(email: string): Observable<any>{
    return this.http.get<any>(this.url + "/emailpessoa/" + email);
  }
}
