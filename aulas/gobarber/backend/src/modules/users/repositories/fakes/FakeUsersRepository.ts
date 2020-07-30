import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const userFound = this.users.find(user => user.id === id);
    return userFound;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const userFound = this.users.find(user => user.email === email);
    return userFound;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, { id: uuid() }, userData);
    this.users.push(newUser);
    return newUser;
  }

  public async update(user: User): Promise<User> {
    const userIndex = this.users.findIndex(
      userFound => userFound.id === user.id,
    );
    this.users[userIndex] = user;
    return user;
  }
}

export default FakeUsersRepository;
