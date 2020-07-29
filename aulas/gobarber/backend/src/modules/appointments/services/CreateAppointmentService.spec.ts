import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/AppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create an appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointment = await createAppointment.execute({
      provider_id: '123412',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toEqual('123412');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      provider_id: '123412',
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        provider_id: '123412',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
