import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isAuthenticated(): boolean{
    return localStorage.getItem("email") != null;
  }
}
