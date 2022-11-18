import { PrimaryColumnCannotBeNullableError } from "typeorm";

export interface UserData {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  phone: string;
  role: string[];
}
export interface Card {
  id: number;
  word: string;
  translation: string;
  image: string;
}
