CREATE TABLE Endereco (
    id_endereco INT PRIMARY KEY IDENTITY,
    logradouro VARCHAR(255),
    numero INT,
    complemento VARCHAR(45),
    bairro VARCHAR(45),
    cep CHAR(9)
);

CREATE TABLE Adotante (
    id_adotante INT PRIMARY KEY IDENTITY,
    nome VARCHAR(60),
    data_nascimento DATETIME,
    cpf CHAR(11),
    telefone CHAR(11),
    email VARCHAR(255),
    senha VARCHAR(16),
    url_imagem VARCHAR(2083),
    fk_endereco INT FOREIGN KEY REFERENCES Endereco(id_endereco)
);

CREATE TABLE Ong (
    id_ong INT PRIMARY KEY IDENTITY,
    nome_responsavel VARCHAR(60),
    razao_social VARCHAR(45),
    data_fundacao DATETIME,
    cnpj CHAR(14), 
    telefone CHAR(11),
    email VARCHAR(255),
    senha VARCHAR(16),
    url_imagem VARCHAR(2083),
    fk_endereco INT FOREIGN KEY REFERENCES Endereco(id_endereco)
);

CREATE TABLE Animal (
    id_animal INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45),
    descricao TEXT,
    data_nascimento DATETIME,
    genero CHAR(1),
    data_chegada DATETIME,
    cor_pelagem Varchar(20),
    castrado TINYINT,
    porte VARCHAR(7),
    tipo_pelagem VARCHAR(7),
    vacinado TINYINT,
    comportamento VARCHAR(45),
    adotado TINYINT, 
    necessidade_especiais TEXT,
    url_imagem VARCHAR(2083),
    fk_ong INT FOREIGN KEY REFERENCES Ong(id_ong)

);

CREATE TABLE Processo_Adocao (
    id_adocao INT PRIMARY KEY IDENTITY,
    data_adocao DATETIME,
    favoritado TINYINT,
    feedback TEXT,
    avaliacao_site INT,
    modo_contato VARCHAR(25),
    fk_adotante INT FOREIGN KEY REFERENCES Adotante(id_adotante) NOT NULL,
    fk_animal INT FOREIGN KEY REFERENCES Animal(id_animal) NOT NULL
);
