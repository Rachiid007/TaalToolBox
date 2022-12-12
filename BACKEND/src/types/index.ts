export interface UserData {
  name: string;
  surname: string;
  email: string;
  birthdate: string;
  phone: string;
  role: string[];
  schoolclass: string[];
  school: string;
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
  birthdate: string;
  password: string;
  phone: string;
  school: string;
  class: string;
  role: string;
}
