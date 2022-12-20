// Type pour checker ce qu'on recoit de la base de données
export interface User {
  id: number
  name: string
  surname: string
  email: string
  schoolEmail: string
  birthdate: string
  role: string[]
  schoolClass: string[]
  school: string
  sex: string
  accessToken: string
}

// Type qu'on essaie d'envooyer dans la base de données : on envoie 1 role à la fois
export interface UserFormData {
  name: string
  surname: string
  email: string
  schoolEmail: string
  birthdate: string
  password: string
  school: string
  schoolClass: string
  role: string
  sex: string
}

export interface UserFromExcelFile {
  firstName: string
  lastName: string
  schoolEmail: string
  privateEmail: string
  birthdate: Date
  class: string
  sex: string
}
