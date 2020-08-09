import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });
  it('should be able to list the providers', async () => {
    const users = [];
    users.push(
      await fakeUsersRepository.create({
        name: 'Pedro Moreno 1',
        email: 'pedro1@example.com',
        password: 'password123',
      }),
    );

    users.push(
      await fakeUsersRepository.create({
        name: 'Pedro Moreno 2',
        email: 'pedro2@example.com',
        password: 'password123',
      }),
    );

    const logedUser = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const profiles = await listProvidersService.execute({
      user_id: logedUser.id,
    });

    expect(profiles).toEqual(users);
  });
});
