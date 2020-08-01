import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    const profile = await showProfileService.execute({ user_id: user.id });

    expect(profile.name).toBe('Pedro Moreno');
    expect(profile.email).toBe('pedro@example.com');
  });

  it('should not be able to show the profile from inexistent user', async () => {
    expect(
      showProfileService.execute({ user_id: 'non-existing-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
