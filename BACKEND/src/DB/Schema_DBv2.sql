CREATE TABLE role (
  id_role SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
);

INSERT INTO role (id, name) VALUES (DEFAULT, 'administrateur');
INSERT INTO role (id, name) VALUES (DEFAULT, 'professeur');
INSERT INTO role (id, name) VALUES (DEFAULT, 'createur');
INSERT INTO role (id, name) VALUES (DEFAULT, 'eleve');

CREATE TABLE ecole (
    Id_ecole SERIAL PRIMARY KEY,
    Nom_ecole VARCHAR (50),
    addresse varchar (70)
);

INSERT INTO classroom (id, name, address) VALUES (DEFAULT, 'Institut Saint-Joseph','Rue Félix Hap 14, 1040 Bruxelles');
INSERT INTO classroom (id, name, address) VALUES (DEFAULT, 'Institut Don Bosco ','Av. du Val dOr 90, 1150 Woluwe-Saint-Pierre');
INSERT INTO classroom (id, name, address) VALUES (DEFAULT, 'Institut Cardinal Mercier','Rue Portaels 81, 1030 Schaerbeek');
INSERT INTO classroom (id, name, address) VALUES (DEFAULT, 'C.E.S.E. Ernest Richard','Pl. Saint-Pierre 5, 1040 Etterbeek');

CREATE TABLE user_test (
  id_user SERIAL PRIMARY KEY,
  name VARCHAR(45) NOT NULL,
  surname varchar(45) NOT NULL,
  birth_date DATE,
  password varchar (45) NOT NULL,
  email varchar(45) UNIQUE,
  telephone varchar(10),
  id_role int NOT NULL,
  Id_ecole int NOT NULL,
   CONSTRAINT fk_role
      FOREIGN KEY(id_role ) 
	    REFERENCES role(id_role),
    CONSTRAINT fk_ecole
      FOREIGN KEY(Id_ecole) 
	    REFERENCES ecole(Id_ecole)
);

INSERT INTO user_test(id_user, name, surname, birth_date, password, email, telephone,id_role, Id_ecole)
VALUES(DEFAULT,'toto', 'titi','02-05-2000','1234', 'brc@gmail.com','0465879412', 1,1);