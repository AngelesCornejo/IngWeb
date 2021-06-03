drop DATABASE if EXISTS RecetasNode;
CREATE DATABASE IF NOT EXISTS RecetasNode;
use RecetasNode;


create table usuarios(id_user int NOT NULL AUTO_INCREMENT,
nombre varchar(25),
password varchar(120),
email varchar(25),
estrellas_prom double(3,2),
npuntuaciones int,
primary key(id_user)
);


create table categorias(
id_categoria int auto_increment Primary key,
categoria varchar(20) not null
);


create table ingredientes(id_ingr int NOT NULL AUTO_INCREMENT,
nomb_ing varchar(25),
id_categoria int not null,
primary key(id_ingr),
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
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
id_categoria int not null,
primary key(id_receta),
FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
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

insert into categorias(categoria) values("Todos"),("Puerco"),("Pollo");


insert into ingredientes(id_categoria, nomb_ing) values (1,"Zanahoria");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Papa");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Aceite de olivo");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Calabaza");
insert into ingredientes(id_categoria,nomb_ing) values (3,"Huevo");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Tortillas");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Jitomate");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Cebolla");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Chile de arbol");
insert into ingredientes(id_categoria,nomb_ing) values (1,"Chicharos");

insert into req_especiales(req) values ("Horno de gas"),("Horno de microondas"),("Horno electrico"),("Estufa"),("Batidora"),("Licuadora");



insert into recetas(nb_imagen_receta, nomb_receta, descripcion,tiempo,nacionalidad,calorias,porcion_calorias,tipo_porcion,id_categoria) 
values ("Pollo 1.png","Pollo asado","Un pollito bien asadito",15, "internacional",300,100,2,3),
 ("MexEgg.png","MexicanEgg","Un huevo a la mexicana",15, "Mexico",650,1,1,3);
insert into req_rec values(4,1,0),(4,2,0);

alter table usuarios add pais varchar(50);
alter table usuarios add genero varchar(10);