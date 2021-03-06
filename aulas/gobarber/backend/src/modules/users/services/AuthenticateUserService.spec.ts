import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const response = await authenticateUserService.execute({
      email: 'pedro@example.com',
      password: 'password123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user.email).toEqual(user.email);
  });

  it('should not be able to authenticate an inexistent user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'pedro@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'pedro@example.com',
        password: 'password1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
