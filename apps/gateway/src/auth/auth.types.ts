export type UserCredentials = {
  email: string
  password: string
}

export type Identificable = {
  _id: string
}

export type UserRegister = { name: string } & UserCredentials

export type UserCreated = UserRegister & Identificable

export type AuthToken = {
  accessToken: string
}
