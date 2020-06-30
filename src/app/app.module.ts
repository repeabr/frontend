import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuComponent } from './menu/menu.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { FooterComponent } from './footer/footer.component';
import { AtualizarComponent } from './atualizar/atualizar.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import { InteresseComponent } from './interesse/interesse.component';
import { PostComponent } from './post/post.component';
import { CadastroInteresseComponent } from './cadastro-interesse/cadastro-interesse.component';
import { ArtigoComponent } from './artigo/artigo.component';
import { ListaPostsComponent } from './lista-posts/lista-posts.component';
import { PostPerfilComponent } from './post-perfil/post-perfil.component';
import { ListaArtigoComponent } from './lista-artigo/lista-artigo.component';
import { ArtigoInicialComponent } from './artigo-inicial/artigo-inicial.component';
import { ArtigosPerfilComponent } from './artigos-perfil/artigos-perfil.component';
import { ArtigoPerfilComponent } from './artigo-perfil/artigo-perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    MenuComponent,
    PaginaInicialComponent,
    FooterComponent,
    AtualizarComponent,
    ListaUsuariosComponent,
    PerfilComponent,
    InteresseComponent,
    PostComponent,
    CadastroInteresseComponent,
    ArtigoComponent,
    ListaPostsComponent,
    PostPerfilComponent,
    ListaArtigoComponent,
    ArtigoInicialComponent,
    ArtigosPerfilComponent,
    ArtigoPerfilComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
