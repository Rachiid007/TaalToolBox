export interface UserData {
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  role: string[];
  schoolClass: string[];
  school: string;
  sex: string;
  infos: object;
}
export interface Card {
  id: number;
  word: string;
  translation: string;
  image: string;
}
export interface AnswerType {
  id: number;
  name: string;
  description: string;
  weight: number;
}
export interface UserFormData {
  name: string;
  surname: string;
  email: string;
  schoolEmail;
  birthdate: string;
  password: string;
  phone: string;
  school: string;
  schoolClass: string;
  role: string;
  sex: string;
}
