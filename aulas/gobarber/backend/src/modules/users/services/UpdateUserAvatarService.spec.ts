import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });
  it('should be able to update an avatar from user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.png',
    });

    expect(user.avatar).toBe('test.png');
  });

  it('should not be able to update an avatar from an inexistent user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'no-id',
        avatarFilename: 'test.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.png',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('test.png');
    expect(user.avatar).toBe('test2.png');
  });
});
