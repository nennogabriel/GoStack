import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });
  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an new user with same email from another', async () => {
    await createUser.execute({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await expect(
      createUser.execute({
        name: 'Pedro Moreno',
        email: 'pedro@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
