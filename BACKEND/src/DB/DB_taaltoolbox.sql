CREATE SCHEMA IF NOT EXISTS "Taaltoolbox"
    AUTHORIZATION postgres;

-- category (~types)= mot, verbe ou phrase
CREATE TABLE "Taaltoolbox"."category" (
  id_category SERIAL,
  name VARCHAR(45) NOT NULL,
  description varchar(120), 
  PRIMARY KEY (id_category)
);

--liste des langues (ex: NL, FR, EN)
CREATE TABLE "Taaltoolbox"." lang" (
  id_lang SERIAL,
  code char(2) NOT NULL,
  name VARCHAR(45) NOT NULL, 
  PRIMARY KEY (id_lang)
);

-- liste des activités, ex: flashcards...
CREATE TABLE "Taaltoolbox"."activity" (
  id_activity SERIAL,
  name VARCHAR(45) NOT NULL,
  description varchar(120),
  PRIMARY KEY (id_activity)
);

-- liste des roles: élève, créateur, professeur, administrateur
CREATE TABLE role (
  id_role SERIAL PRIMARY KEY;
  name VARCHAR(45) NOT NULL,
);

INSERT INTO role (id_role, name) VALUES (DEFAULT, 'administrateur');
INSERT INTO role (id_role, name) VALUES (DEFAULT, 'professeur');
INSERT INTO role (id_role, name) VALUES (DEFAULT, 'createur');
INSERT INTO role (id_role, name) VALUES (DEFAULT, 'eleve');

-- choix possibles: j'ai trouvé, pas trouvé, presque
CREATE TABLE "Taaltoolbox"."answer" (
  id_answer SERIAL,
  name varchar(45) NOT NULL,
  description varchar(45) NOT NULL,
  PRIMARY KEY (id_answer)
);

-- liste corps de métier/ domaine d'apprentissage
CREATE TABLE "Taaltoolbox"."learn_domain" (
  id_learn_domain SERIAL,
  name varchar(45) NOT NULL,
  description varchar(45) NOT NULL,
  PRIMARY KEY (id_learn_domain) 
);

-- liste de recompense/accomplissement
CREATE TABLE "Taaltoolbox"."reward" (
  id_reward char(4) NOT NULL,
  name varchar(45) NOT NULL,
  description varchar(45) NOT NULL,
  PRIMARY KEY (id_reward) 
);

CREATE TABLE "Taaltoolbox"."card" (
  id_card SERIAL,
  content VARCHAR(45) NOT NULL, 					-- contenu de la carte "elephant"
  answer varchar(45),								-- si besoin de rentrer une reponse
  description varchar(120) NOT NULL,
  img varchar(45) , 
  sound varchar(45),
  lang char(2),										-- EN,NL,FR
  id_activity int, 
  id_learn_domain int, 
  id_category int, 								
  PRIMARY KEY (id_card),
  FOREIGN KEY (id_activity)
  REFERENCES "Taaltoolbox"."activity" (id_activity),
  FOREIGN KEY (id_learn_domain)
  REFERENCES "Taaltoolbox"."learn_domain" (id_learn_domain),
  FOREIGN KEY (id_category)
  REFERENCES "Taaltoolbox"."category" (id_category)
);

CONSTRAINT id_role FOREIGN KEY (id_role)
        REFERENCES "Taaltoolbox".role (id_role) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION

drop table "Taaltoolbox"."users"
CREATE TABLE "Taaltoolbox"."users" (
  id_user SERIAL,
  name VARCHAR(45) NOT NULL,
  surname varchar(45) NOT NULL,
  birth_date DATE,
  password varchar (45) NOT NULL,
  id_role int NOT NULL,
  PRIMARY KEY (id_user),
  CONSTRAINT id_role FOREIGN KEY (id_role)
        REFERENCES "Taaltoolbox".role (id_role) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION 
);

-- ex: le user 1 repond "j'ai trouvé" à la carte 1
CREATE TABLE "Taaltoolbox"."user_response" (
  id_user_response SERIAL,
  name varchar(45) NOT NULL,
  date_response DATE,
  id_card INT NOT NULL,
  id_answer INT NOT NULL,
  id_user INT NOT NULL, 
  PRIMARY KEY (id_user_response), 
  FOREIGN KEY (id_card)
  REFERENCES "Taaltoolbox"."card" (id_card),
  FOREIGN KEY (id_answer)
  REFERENCES "Taaltoolbox"."answer" (id_answer),
  FOREIGN KEY (id_user)
  REFERENCES "Taaltoolbox"."users" (id_user)   
);

-- permet de conserver sa dernière session/activité
CREATE TABLE "Taaltoolbox"."current_session" (
  id_session SERIAL,
  date_session DATE,
  id_user INT,
  id_card INT,
  PRIMARY KEY (id_session),
  FOREIGN KEY (id_user)
  REFERENCES "Taaltoolbox"."users" (id_user),
  FOREIGN KEY (id_card)
  REFERENCES "Taaltoolbox"."card" (id_card)  
);



-- progression de user
CREATE TABLE "Taaltoolbox"."progress" (
  id_progress char(4) NOT NULL,
  credit INT NOT NULL, 							-- solde restant
  id_reward varchar(45) NOT NULL,
  id_user INT NOT NULL,
  PRIMARY KEY (id_progress),
  FOREIGN KEY (id_user)
  REFERENCES "Taaltoolbox"."users" (id_user),
  FOREIGN KEY (id_reward)
  REFERENCES "Taaltoolbox"."reward" (id_reward)      
);
