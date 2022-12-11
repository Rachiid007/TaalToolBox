import { School } from './../../../BACKEND/src/school/entities/school.entity'
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
