drop DATABASE if EXISTS RecetasNode;
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

create table recetas(
id_receta int NOT NULL AUTO_INCREMENT,
nb_imagen_receta varchar(50),
nomb_receta varchar(30),
descripcion varchar (100),
tiempo int,
nacionalidad varchar(30),
calorias int,
porcion_calorias int,
tipo_porcion int,
primary key(id_receta)
);

create table req_especiales(
id_req int not NULL AUTO_INCREMENT primary key,
req varchar(20)
);

create table req_rec(
id_req int NOT NULL,
id_receta int NOT NULL,
opcional int(1),
FOREIGN KEY (id_receta) REFERENCES recetas(id_receta),
FOREIGN KEY (id_req) REFERENCES req_especiales(id_req)
);


create table recetas_ing(
id_receta int NOT NULL,
id_ingr int NOT NULL,
cantidad int,
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
insert into ingredientes(nomb_ing) values ("Jitomate");
insert into ingredientes(nomb_ing) values ("Cebolla");
insert into ingredientes(nomb_ing) values ("Chile de arbol");
insert into ingredientes(nomb_ing) values ("Chicharos");

insert into req_especiales(req) values ("Horno de gas"),("Horno de microondas"),("Horno electrico"),("Estufa"),("Batidora"),("Licuadora");



insert into recetas(nb_imagen_receta, nomb_receta, descripcion,tiempo,nacionalidad,calorias,porcion_calorias,tipo_porcion) 
values ("Pollo 1.png","Pollo asado","Un pollito bien asadito",15, "internacional",300,100,2),
<<<<<<< HEAD
values ("MexEgg.png","MexicanEgg","Un huevo a la mexicana",15, "Mexico",650,1,1);
=======
 ("MexEgg.png","MexicanEgg","Un huevo a la mexicana",15, "Mexico",650,1,1);
insert into req_rec values(4,1,0),(4,2,0);
>>>>>>> 0f47fd15f89e334c188713d943f7f05547bf6f50
