import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createAppointment = new CreateUserService(fakeUsersRepository);
    const appointment = await createAppointment.execute({
      name: 'Pedro Moreno',
      email: 'pedro@example.com',
      password: 'password123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.email).toEqual('pedro@example.com');
  });
});
