export class Interesse{
    id: number;
    nome: string;
}

export class Pessoa{
    id: number;

    email: string;
    senha: string;

    curriculo: Curriculo;
    formacao: Formacao;
    infos: InfoAdicionais;
    interesses: string;
    trabalho: Trabalho;

    seguindo: any;
    seguidores: any;
    postsCurtidos: any;
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
    rg: string;
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
    txt: string;
    emailAutor: string;
    curtidas: number;

    pessoasCurtiram: any;
    status: string;
}

export class Artigo {
    id: number;
    publicacao: Publicacao;
    emailAutor: string;
    listaTags = [];
    docName: string;
    curtidas: number;
}

export class Publicacao{
    titulo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}

export class Notificacao{
    tipoPublicacao: string;
    titulo: string;
    autor: String;
    visualizacao: boolean;
}
