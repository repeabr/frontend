export class Pessoa{
    id: number;

    email: string;
    senha: string;

    curriculo: Curriculo;
    formacao: Formacao;
    infos: InfoAdicionais;
    interesses: string;
    trabalho: Trabalho;
}

export class Curriculo {
    link: string;
}

export class Formacao {
    nivelDeFormacao: string;
    localDeFormacao: string;
}

export class InfoAdicionais {
    nomePessoa: string;
    dataNascimento: string;
    dataInicioCientista: string;
    cpf: string;
}

export class Glossario{
    nome: string;
    status: string;
}

export class Trabalho{
    nomeInstituicao: string;
    cidadeOndeTrabalha: string;
    estadoOndeTrabalha: string;
}

//-------------------------------------------------
export class Post{
    id: number;
    publicacao: Publicacao;
    emailAutor: string;
    curtidas: number;
}

export class Publicacao{
    titulo: string;
    conteudo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}

//------------------------------------------------
export class Curtida {
    id: number;
    idPostCurtido: number;
    idUsuarioCurtiu: number;
}

//---------------------------------------------------
export class PostPessoa {
    idDoPost: number;
    publicacao: Publicacao;
    emailAutor: string;
    curtidas: number;
    status: string;   
}