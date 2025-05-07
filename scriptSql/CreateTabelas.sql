/*Criando a tabela de usuário*/

CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    perfil VARCHAR(100) not null,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "financeiro".public."User" RENAME COLUMN createat TO "createdAt";
ALTER TABLE "financeiro".public."User" RENAME COLUMN updateat TO "updatedAt";


/*Criando a Tabela de Igrejas*/

CREATE TABLE "Igreja"(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    fantasia VARCHAR(100) NOT NULL,
    endereco VARCHAR(100) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50),
    estado VARCHAR(50),
    cep VARCHAR(10),
    cnpjempresa VARCHAR(20),
    responsavel VARCHAR(30),
    email VARCHAR(50),
    matriz bool,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE "financeiro".public."Igreja" RENAME COLUMN createat TO "createdAt";
ALTER TABLE "financeiro".public."Igreja" RENAME COLUMN updateat TO "updatedAt";