export type CreateUser = {
  name: string
  email: string
  password: string
  city: string
  state: string
  telephone?: string | null
}

export type UserList = CreateUser[]
