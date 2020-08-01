import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';

export default interface AppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
