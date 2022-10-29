use DB_taaltoolbox.v2;
insert into card values (1, 'électricité', 'elektriciteit' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (2, 'tension', 'spanning' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (3, 'électrique', 'elektrisch' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (4, 'câble', 'kabel' , 'nom masculin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (5, 'ampoule', 'ampul' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (6, 'compteur électrique', 'elektriciteits meter' , 'nom masculin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (7, 'court circuit', 'kortsluiting' , 'nom masculin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (8, 'prise électrique', 'stopcontact' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (9, 'disjoncteur', 'stroomonderbreker' , 'nom masculin', 'img', 'sound', 1, 1, 1, 1);
insert into card values (10, 'fusible', 'zekering' , 'nom féminin', 'img', 'sound', 1, 1, 1, 1);


insert into category values (1, 'mot', 'cette categorie est utilisé pour les mots');
insert into category values (2, 'verbe', 'cette categorie est utilisé pour les verbes');
insert into category values (3, 'phrase', 'cette categorie est utilisé pour les phrases');

insert into lang values (1, 'FR', 'Francais');
insert into lang values (2, 'NL', 'Néerlandais');
insert into lang values (3, 'EN', 'Anglais');

insert into activity values (1, 'Flashcard', 'jeu de Flashcard');
insert into activity values (2, 'Glisser-déposer', 'jeu de Glisser-déposer de textes/images');

insert into role values (1, 'Elève', 'role élève');
insert into role values (2, 'Créateur', 'role créateur');
insert into role values (3, 'Enseignant', 'role professeur');
insert into role values (4, 'Administrateur', 'role administrateur');

insert into answer values (1, 'J ai trouvé', 'l utilisateur à répondu juste', 0);
insert into answer values (2, 'Je n ai pas trouvé','l utilisateur n a pas trouvé', 2);
insert into answer values (3, 'J y était presque', 'la réponse de l utilisateur se rapprochait du résultat', 2);

insert into learn_domain values (1, 'Electricité', 'cursus électricité');
insert into learn_domain values (2, 'Mécanique', 'cursus mécanique');
insert into learn_domain values (3, 'Informatique', 'cursus informatique');

insert into school values (1, 'ISJ', 'Institut Saint-Joseph (ISJ)', 'Rue Félix Hap 14, 1040 Bruxelles' );
insert into school values (2, 'IDB', 'Institut Don Bosco(IDB)', 'Av. du Val d\'Or 90, 1150 Woluwe-Saint-Pierre');
insert into school values (3, 'ICM', 'Institut Cardinal Mercier (ICM)', 'Rue Portaels 81, 1030 Schaerbeek');
insert into school values (1, 'CESE', 'C.E.S.E. Ernest Richard', 'Pl. Saint-Pierre 5, 1040 Etterbeek' );

insert into schoolclass values (1, '1elec', 'année option électricité');
insert into schoolclass values (2, '1meca', 'année option mécanique');
insert into schoolclass values (3, '1IT', 'année option informatique');

insert into proficiency values (1, 'Mot inconnu', 'quand un mot n a pas encore été rencontré', 3);
insert into proficiency values (2, 'En apprentissage niveau 0/3', '0/3 réponse correcte sur les trois derniers essais', 6);
insert into proficiency values (3, 'En apprentissage niveau 1/3', '1/3 réponse correcte sur les trois derniers essais', 6);
insert into proficiency values (4, 'En apprentissage niveau 2/3', '2/3 réponses correctes sur les trois derniers essais', 6);
insert into proficiency values (5, 'Acquis niveau 0/3', '0/3 réponse correcte sur les trois derniers essais', 1);
insert into proficiency values (6, 'Acquis niveau 1/3', '1/3 réponse correcte sur les trois derniers essais', 1);
insert into proficiency values (7, 'Acquis niveau 2/3', '2/3 réponses correctes sur les trois derniers essais', 1);
insert into proficiency values (8, 'Maîtrisé', 'mot maîtrisé', 0);

-- à traiter-- accomplissements, magasin, garage...
insert into reward values (1, 'monnaie', 'afin d acheter des véhicules');
insert into reward values (2, 'titre', 'purement cosmétique pour afficher sur son profil');
insert into reward values (3, 'customise avatar', 'De nouveaux moyens de customiser son avatar (accessoires, etc');
insert into reward values (4, 'customise véhicule', 'De nouveaux moyens de customiser son avatar (accessoires, etc');


insert into users values (1, 'Philippe', 'Martin' , 'p.martin@ecole.com', '1234', '09-09-1999', '0412345678', 'position GPS',3, 1, 'ISJ', '1elec');
insert into users values (2, 'Eric', 'Durant' , 'e.durant@ecole.com', '1234','09-09-1999', '0412345678','position GPS', 2, 1, 'IDB', '1elec');
insert into users values (3, 'Jean', 'Petit' , 'j.petit@ecole.com', '1234','09-09-1999', '0412345678', 'position GPS', 1, 1, 'ICM', '1elec');
insert into users values (4, 'Charles', 'Bernard' , 'c.bernard@ecole.com', '1234', '09-09-1999', '0412345678', 'position GPS', 4, 1, 'CESE', '1elec');


insert into user_response values (1, now(), 1, 1, 1,2);
insert into user_response values (2, now(), 1, 2, 2,2);
insert into user_response values (3, now(), 1, 3, 3,5);
insert into user_response values (4, now(), 1, 4, 1,8);
insert into user_response values (5, now(), 1, 5, 2,8);
insert into user_response values (6, now(), 1, 6, 3,4);
insert into user_response values (7, now(), 1, 7, 1,6);
insert into user_response values (8, now(), 1, 8, 3,6);
insert into user_response values (9, now(), 1, 9, 2,8);
insert into user_response values (10, now(), 1, 10, 2,2);


commit; 


