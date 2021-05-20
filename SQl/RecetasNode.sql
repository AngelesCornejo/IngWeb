CREATE DATABASE IF NOT EXISTS RecetasNode;
use RecetasNode;


create table usuarios(id_user int NOT NULL AUTO_INCREMENT,
nombre varchar(25),
password varchar(120),
email varchar(25),
primary key(id_user)
);



create table ingredientes(id_ingr int NOT NULL AUTO_INCREMENT,
nomb_ing varchar(25),
primary key(id_ingr)
);

create table recetas(id_receta int NOT NULL AUTO_INCREMENT,
nb_imagen_receta varchar(50),
nomb_receta varchar(30),
descripcion varchar (100),
tiempo int,
nacionalidad varchar(30),
calorias int,
porcion_calorias int,
id_ingr int,
primary key(id_receta)
);

create table recetas_ing(id_receta int NOT NULL ,
id_ingr int NOT NULL ,
cantidad integer,
t_cantidad int,
FOREIGN KEY (id_receta) REFERENCES recetas(id_receta),
FOREIGN KEY (id_ingr) REFERENCES ingredientes(id_ingr)
);

insert into ingredientes(nomb_ing) values ("Zanahoria");
insert into ingredientes(nomb_ing) values ("Papa");
insert into ingredientes(nomb_ing) values ("Aceite");
insert into ingredientes(nomb_ing) values ("Calabaza");
insert into ingredientes(nomb_ing) values ("Huevo");
insert into ingredientes(nomb_ing) values ("Tortillas");





