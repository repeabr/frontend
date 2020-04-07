import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AuthGuard } from './auth/auth.guard';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InteresseComponent } from './interesse/interesse.component';


const routes: Routes = [
  {path:"", component:PaginaInicialComponent, canActivate: [AuthGuard]},

  {path:"login", component:LoginComponent},  
  {path:"cadastro", component: CadastroComponent},

  {path:"lista", component:ListaUsuariosComponent},  
  {path:"atualizar", component: AtualizarComponent},
  {path:"perfil", component: PerfilComponent},
  {path:"interesses", component: InteresseComponent},

  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
