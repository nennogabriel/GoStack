import { Request, Response } from 'express'
import createUser from './service/CreateUser'

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'pedro@seal.works',
    password: '123456',
    techs: [
      'NodeJs',
      'ReactJS',
      'React Native',
      { title: 'JavaScript', expirience: 100 }
    ]
  })

  return response.json({ message: "Hello wolrd" });
}
