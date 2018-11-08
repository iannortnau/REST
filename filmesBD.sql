create DATABASE filmesPHP;
drop database filmesPHP;
use filmesPHP;
show databases;

show tables;


create TABLE Filmes(
	cod_filme INT auto_increment PRIMARY KEY,
    nome_filme VARCHAR(45) NOT NULL,
    descricao VARCHAR(2000) NOT NULL,
    nota INT 
);


    