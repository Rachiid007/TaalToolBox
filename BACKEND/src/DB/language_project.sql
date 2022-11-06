CREATE TABLE "category" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120) NOT NULL
);

CREATE TABLE "lang" (
  "id" SERIAL PRIMARY KEY,
  "code" char(2) NOT NULL,
  "name" varchar(45) NOT NULL
);

CREATE TABLE "activity" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120)
);

CREATE TABLE "role" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120)
);

CREATE TABLE "answer" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120)
);

CREATE TABLE "learn_domain" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120)
);

CREATE TABLE "school" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120),
  "address" varchar(120) NOT NULL
);

CREATE TABLE "schoolclass" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120),
  "id_school" int NOT NULL
);

CREATE TABLE "reward" (
  "id" char(4) PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120)
);

CREATE TABLE "proficiency" (
  "id" char(4) PRIMARY KEY,
  "name" varchar(45) NOT NULL,
  "description" varchar(120),
  "weight" int NOT NULL
);

CREATE TABLE "card" (
  "id" SERIAL PRIMARY KEY,
  "word" varchar(45) NOT NULL,
  "translation" varchar(45),
  "description" varchar(120),
  "image" varchar(45),
  "sound" varchar(45),
  "id_activity" int,
  "id_learn_domain" int,
  "id_category" int,
  "id_lang" char(2)
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(45),
  "surname" varchar(45) NOT NULL,
  "email" varchar(45) NOT NULL,
  "password" varchar(45) NOT NULL,
  "birth_date" DATE NOT NULL,
  "phone" varchar(20),
  "starting_point" varchar(120),
  "id_users_role" int NOT NULL,
  "id_lang" int NOT NULL,
  "id_users_class" int NOT NULL
);

CREATE TABLE "users_class" (
  "id" SERIAL PRIMARY KEY,
  "id_users" int,
  "id_schoolclass" int
);

CREATE TABLE "users_role" (
  "id" SERIAL PRIMARY KEY,
  "id_users" int,
  "id_role" int
);

CREATE TABLE "user_response_card" (
  "id" SERIAL PRIMARY KEY,
  "date_response" int,
  "id_user" int NOT NULL,
  "id_card" int NOT NULL,
  "id_answer" datetime,
  "id_proficiency" int
);

CREATE TABLE "current_session" (
  "id" SERIAL PRIMARY KEY,
  "date_session" DATE,
  "id_user" int,
  "id_card" int
);

CREATE TABLE "progress" (
  "id" SERIAL PRIMARY KEY,
  "credit" DATE NOT NULL,
  "id_reward" int NOT NULL,
  "id_user" int NOT NULL
);

ALTER TABLE "schoolclass" ADD FOREIGN KEY ("id_school") REFERENCES "school" ("id");

ALTER TABLE "card" ADD FOREIGN KEY ("id_activity") REFERENCES "activity" ("id");

ALTER TABLE "card" ADD FOREIGN KEY ("id_learn_domain") REFERENCES "learn_domain" ("id");

ALTER TABLE "card" ADD FOREIGN KEY ("id_category") REFERENCES "category" ("id");

ALTER TABLE "card" ADD FOREIGN KEY ("id_lang") REFERENCES "lang" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id_users_role") REFERENCES "users_role" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id_lang") REFERENCES "lang" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("id_users_class") REFERENCES "users_class" ("id");

ALTER TABLE "users_class" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id");

ALTER TABLE "users_class" ADD FOREIGN KEY ("id_schoolclass") REFERENCES "schoolclass" ("id");

ALTER TABLE "users_role" ADD FOREIGN KEY ("id_role") REFERENCES "role" ("id");

ALTER TABLE "users_role" ADD FOREIGN KEY ("id_users") REFERENCES "users" ("id");

ALTER TABLE "user_response_card" ADD FOREIGN KEY ("id_card") REFERENCES "card" ("id");

ALTER TABLE "user_response_card" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "user_response_card" ADD FOREIGN KEY ("id_answer") REFERENCES "answer" ("id");

ALTER TABLE "user_response_card" ADD FOREIGN KEY ("id_proficiency") REFERENCES "proficiency" ("id");

ALTER TABLE "current_session" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "current_session" ADD FOREIGN KEY ("id_card") REFERENCES "card" ("id");

ALTER TABLE "progress" ADD FOREIGN KEY ("id_reward") REFERENCES "reward" ("id");

ALTER TABLE "progress" ADD FOREIGN KEY ("id_user") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("name") REFERENCES "users" ("id");
