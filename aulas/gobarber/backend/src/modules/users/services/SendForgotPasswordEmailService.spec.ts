import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able recover the password by email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'password123',
    });

    await sendForgotPasswordEmail.execute({ email: 'fake@email.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able recover from a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'fake@email.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generated a forgot password token', async () => {
    const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'password123',
    });

    await sendForgotPasswordEmail.execute({ email: 'fake@email.com' });

    expect(generatedToken).toHaveBeenCalledWith(user.id);
  });
});
