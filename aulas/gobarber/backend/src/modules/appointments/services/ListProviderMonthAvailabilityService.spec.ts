import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 13, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 8, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'client',
      date: new Date(2020, 4, 9, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 8, available: false },
        { day: 20, available: true },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
