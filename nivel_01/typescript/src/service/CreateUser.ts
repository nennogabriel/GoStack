
interface TechObject {
  title: string,
  expirience: number
}

interface CreateUserData {
  name?: string,
  email: string,
  password: string,
  techs: Array<string | TechObject>,
}

export default function createUser({ name = '', email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password
  }
  return user
}