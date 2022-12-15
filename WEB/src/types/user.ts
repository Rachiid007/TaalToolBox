export interface User {
  id: number
  name: string
  surname: string
  email: string
  birthdate: string
  phone: string
  role: string[]
  schoolclass: string[]
  school: string
}

export interface UserFormData {
  name: string
  surname: string
  email: string
  birthdate: string
  password: string
  phone: string
  school: string
  class: string
  role: string
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
