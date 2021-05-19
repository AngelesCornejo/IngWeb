create database IngWeb;

	use IngWeb;

	create table usuarios(id_user int NOT NULL AUTO_INCREMENT,
						  nombre varchar(25),
						  password varchar(10),
						  email varchar(25),
	 				      primary key(id_user)
	 				      );

	create table ingredientes(id_ingr int NOT NULL AUTO_INCREMENT,
						  nomb_ing varchar(25),
	 				      primary key(id_ingr)
	 				      );

	create table recetas(id_receta int NOT NULL AUTO_INCREMENT,
						 nomb_receta varchar(30),
						 descripcion varchar (100),
						 tiempo int,
						 nacionalidad varchar(30),
						 calorias int,
						 porcion_calorias int,
						 id_ingr int,
						 primary key(id_receta),
						 foreign key(id_ingr) references ingredientes(id_ingr)
		);

required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}"