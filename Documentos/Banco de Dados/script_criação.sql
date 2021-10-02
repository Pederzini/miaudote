CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY IDENTITY,
    logradouro VARCHAR(255),
    numero INT,
    complemento VARCHAR(45),
    bairro VARCHAR(45),
    cep CHAR(9)
);

CREATE TABLE Adotante (
    idAdotante INT PRIMARY KEY IDENTITY,
    nome VARCHAR(60),
    dataNascimento DATETIME,
    cpf CHAR(11),
    telefone CHAR(11),
    email VARCHAR(255),
    senha VARCHAR(16),
    urlImagem VARCHAR(2083),
    fkEndereco INT FOREIGN KEY REFERENCES Endereco(idEndereco)
);

CREATE TABLE Ong (
    idOng INT PRIMARY KEY IDENTITY,
    nomeResponsavel VARCHAR(60),
    razaoSocial VARCHAR(45),
    dataFundacao DATETIME,
    cnpj CHAR(14), 
    telefone CHAR(11),
    email VARCHAR(255),
    senha VARCHAR(16),
    urlImagem VARCHAR(2083),
    fkEndereco INT FOREIGN KEY REFERENCES Endereco(idEndereco)
);

CREATE TABLE Animal (
    idAnimal INT PRIMARY KEY IDENTITY,
    nome VARCHAR(45),
    descricao TEXT,
    dataNascimento DATETIME,
    genero CHAR(1),
    dataChegada DATETIME,
    corPelagem Varchar(20),
    castrado TINYINT,
    porte VARCHAR(7),
    tipoPelagem VARCHAR(7),
    vacinado TINYINT,
    comportamento VARCHAR(45),
    adotado TINYINT, 
    necessidadeEspeciais TEXT,
    urlImagem VARCHAR(2083),
    fkOng INT FOREIGN KEY REFERENCES Ong(idOng)

);

CREATE TABLE ProcessoAdocao (
    idAdocao INT,
    dataAdocao DATETIME,
    favoritado TINYINT,
    feedback TEXT,
    avaliacaoSite INT,
    fkAdotante INT FOREIGN KEY REFERENCES Adotante(idAdotante),
    fkAnimal INT FOREIGN KEY REFERENCES Animal(idAnimal)
);
