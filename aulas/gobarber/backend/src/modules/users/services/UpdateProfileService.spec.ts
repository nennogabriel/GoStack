import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Pedro Moreno Chagas',
      email: 'pedro@example.com.vc',
    });

    expect(updatedUser.name).toBe('Pedro Moreno Chagas');
    expect(updatedUser.email).toBe('pedro@example.com.vc');
  });

  it('should not be able to change email to another if it already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Zé das couves',
      email: 'ze@example.com',
      password: 'password123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: user.name,
        email: 'pedro@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Pedro Moreno Chagas',
      email: 'pedro@example.com',
      password: 'password1234',
      old_password: 'password123',
    });

    expect(updatedUser.password).toBe('password1234');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Pedro Moreno Chagas',
        email: 'pedro@example.com',
        password: 'password1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Pedro Moreno Chagas',
        email: 'pedro@example.com',
        old_password: 'wrong-password',
        password: 'password1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile from inexistent user', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-name',
        email: 'non-existing@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
