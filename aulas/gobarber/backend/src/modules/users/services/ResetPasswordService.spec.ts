import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password by email token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'password123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      token,
      password: 'password1234',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('password1234');
    expect(generateHash).toBeCalledWith('password1234');
  });

  it('should not to be able to rest password without an token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'no-token',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to rest password without an user', async () => {
    const { token } = await fakeUserTokensRepository.generate('tokenize-me');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not to be able to rest password after two hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'password123',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
