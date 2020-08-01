import { uuid } from 'uuidv4';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointmentFound = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return appointmentFound;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month
      );
    });
    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment => {
      return (
        appointment.provider_id === provider_id &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day
      );
    });
    return appointments;
  }

  public async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, user_id, date });

    this.appointments.push(appointment);
    return appointment;
  }
}

export default FakeAppointmentsRepository;
